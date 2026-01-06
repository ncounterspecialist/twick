#!/bin/bash

# Script to update external @twick/* packages to their latest versions
# External packages are those NOT in this monorepo (like @twick/core, @twick/2d, etc.)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# External packages that should be updated from npm
EXTERNAL_PACKAGES=(
  "@twick/core"
  "@twick/2d"
  "@twick/cli"
  "@twick/renderer"
  "@twick/vite-plugin"
  "@twick/ui"
  "@twick/player-react"
)

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Updating external @twick/* packages to latest versions${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ Error: npm is not installed or not in PATH${NC}"
    exit 1
fi

# Function to get latest version from npm
get_latest_version() {
    local package=$1
    local version=$(npm view "$package" version 2>/dev/null || echo "")
    if [ -z "$version" ]; then
        echo ""
        return 1
    fi
    echo "$version"
}

# Create a temporary file to store latest versions
TEMP_VERSIONS=$(mktemp)
trap "rm -f $TEMP_VERSIONS" EXIT

# Fetch latest versions from npm
echo -e "${CYAN}Fetching latest versions from npm...${NC}"
for package in "${EXTERNAL_PACKAGES[@]}"; do
    echo -n "  Checking $package... "
    version=$(get_latest_version "$package")
    if [ -n "$version" ]; then
        echo "$package|$version" >> "$TEMP_VERSIONS"
        echo -e "${GREEN}✓ $version${NC}"
    else
        echo -e "${RED}✗ Failed${NC}"
    fi
done

# Function to get latest version from temp file
get_latest_from_file() {
    local pkg=$1
    grep "^${pkg}|" "$TEMP_VERSIONS" 2>/dev/null | cut -d'|' -f2 || echo ""
}

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Updating package.json files${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Function to update a package.json file
update_package_json() {
    local file=$1
    local package_name=$(jq -r '.name' "$file")
    local updated=false
    
    echo -e "${CYAN}📦 $package_name${NC}"
    
    # Update dependencies
    for ext_pkg in "${EXTERNAL_PACKAGES[@]}"; do
        latest_version=$(get_latest_from_file "$ext_pkg")
        
        if [ -z "$latest_version" ]; then
            continue
        fi
        
        # Check and update in dependencies
        current_version=$(jq -r ".dependencies.\"$ext_pkg\" // empty" "$file")
        if [ -n "$current_version" ] && [ "$current_version" != "null" ]; then
            # Preserve the version prefix (^, ~, etc.)
            prefix="^"
            if [[ "$current_version" =~ ^\^ ]]; then
                prefix="^"
            elif [[ "$current_version" =~ ^~ ]]; then
                prefix="~"
            elif [[ "$current_version" =~ ^\>= ]]; then
                prefix=">="
            elif [[ "$current_version" =~ ^[[:digit:]] ]]; then
                prefix=""
            fi
            
            new_version="${prefix}${latest_version}"
            if [ "$current_version" != "$new_version" ]; then
                jq --arg pkg "$ext_pkg" --arg version "$new_version" \
                   '.dependencies[$pkg] = $version' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
                echo -e "  ${GREEN}✓${NC} $ext_pkg: $current_version → $new_version (dependencies)"
                updated=true
            fi
        fi
        
        # Check and update in devDependencies
        current_version=$(jq -r ".devDependencies.\"$ext_pkg\" // empty" "$file")
        if [ -n "$current_version" ] && [ "$current_version" != "null" ]; then
            prefix="^"
            if [[ "$current_version" =~ ^\^ ]]; then
                prefix="^"
            elif [[ "$current_version" =~ ^~ ]]; then
                prefix="~"
            elif [[ "$current_version" =~ ^\>= ]]; then
                prefix=">="
            elif [[ "$current_version" =~ ^[[:digit:]] ]]; then
                prefix=""
            fi
            
            new_version="${prefix}${latest_version}"
            if [ "$current_version" != "$new_version" ]; then
                jq --arg pkg "$ext_pkg" --arg version "$new_version" \
                   '.devDependencies[$pkg] = $version' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
                echo -e "  ${GREEN}✓${NC} $ext_pkg: $current_version → $new_version (devDependencies)"
                updated=true
            fi
        fi
        
        # Check and update in peerDependencies
        current_version=$(jq -r ".peerDependencies.\"$ext_pkg\" // empty" "$file")
        if [ -n "$current_version" ] && [ "$current_version" != "null" ]; then
            prefix="^"
            if [[ "$current_version" =~ ^\^ ]]; then
                prefix="^"
            elif [[ "$current_version" =~ ^~ ]]; then
                prefix="~"
            elif [[ "$current_version" =~ ^\>= ]]; then
                prefix=">="
            elif [[ "$current_version" =~ ^[[:digit:]] ]]; then
                prefix=""
            fi
            
            new_version="${prefix}${latest_version}"
            if [ "$current_version" != "$new_version" ]; then
                jq --arg pkg "$ext_pkg" --arg version "$new_version" \
                   '.peerDependencies[$pkg] = $version' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
                echo -e "  ${GREEN}✓${NC} $ext_pkg: $current_version → $new_version (peerDependencies)"
                updated=true
            fi
        fi
    done
    
    if [ "$updated" = false ]; then
        echo "  (no updates needed)"
    fi
    echo ""
}

# Update all package.json files in packages directory
find packages -name "package.json" -type f | while read file; do
    update_package_json "$file"
done

# Update root package.json pnpm.overrides
echo -e "${CYAN}📦 Root package.json (pnpm.overrides)${NC}"
root_updated=false
for ext_pkg in "${EXTERNAL_PACKAGES[@]}"; do
    latest_version=$(get_latest_from_file "$ext_pkg")
    
    if [ -z "$latest_version" ]; then
        continue
    fi
    
    current_version=$(jq -r ".pnpm.overrides.\"$ext_pkg\" // empty" package.json)
    
    if [ -n "$current_version" ] && [ "$current_version" != "null" ]; then
        prefix="^"
        if [[ "$current_version" =~ ^\^ ]]; then
            prefix="^"
        elif [[ "$current_version" =~ ^~ ]]; then
            prefix="~"
        elif [[ "$current_version" =~ ^\>= ]]; then
            prefix=">="
        elif [[ "$current_version" =~ ^[[:digit:]] ]]; then
            prefix=""
        fi
        
        new_version="${prefix}${latest_version}"
        if [ "$current_version" != "$new_version" ]; then
            jq --arg pkg "$ext_pkg" --arg version "$new_version" \
               '.pnpm.overrides[$pkg] = $version' package.json > package.json.tmp && mv package.json.tmp package.json
            echo -e "  ${GREEN}✓${NC} $ext_pkg: $current_version → $new_version"
            root_updated=true
        fi
    fi
done

if [ "$root_updated" = false ]; then
    echo "  (no updates needed)"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Update complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Review the changes with: git diff"
echo "  2. Update lockfile: pnpm install"
echo "  3. Test the build: pnpm build"
echo ""
