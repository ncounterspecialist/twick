#!/bin/bash

# Script to check external @twick/* package versions
# Shows current versions in package.json and compares with latest versions from npm

# Ensure we're using bash 4+ for associative arrays, or use a workaround
if [ -z "$BASH_VERSION" ] || [ "${BASH_VERSION%%.*}" -lt 4 ]; then
    echo "Warning: This script requires bash 4+ for associative arrays"
    echo "Using alternative approach..."
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# External packages that should be checked
EXTERNAL_PACKAGES=("@twick/core" "@twick/2d" "@twick/cli" "@twick/renderer" "@twick/vite-plugin" "@twick/ui" "@twick/player-react")

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Checking external @twick/* package versions${NC}"
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
        echo "N/A"
        return 1
    fi
    echo "$version"
}

# Function to normalize version (remove ^, ~, >=, etc.)
normalize_version() {
    echo "$1" | sed 's/^[^0-9]*//' | sed 's/-.*$//'
}

# Function to compare versions (returns 0 if versions are equal, 1 if current < latest)
compare_versions() {
    local current=$1
    local latest=$2
    local current_norm=$(normalize_version "$current")
    local latest_norm=$(normalize_version "$latest")
    
    if [ "$current_norm" = "$latest_norm" ]; then
        return 0
    fi
    
    # Simple version comparison (works for most cases)
    if [ "$(printf '%s\n' "$current_norm" "$latest_norm" | sort -V | head -n1)" != "$current_norm" ]; then
        return 1
    fi
    return 0
}

# Fetch latest versions from npm
echo -e "${CYAN}Fetching latest versions from npm...${NC}"

# Create a temporary file to store latest versions
TEMP_VERSIONS=$(mktemp)
trap "rm -f $TEMP_VERSIONS" EXIT

for package in "${EXTERNAL_PACKAGES[@]}"; do
    echo -n "  Checking $package... "
    version=$(get_latest_version "$package")
    if [ "$version" != "N/A" ]; then
        echo "$package|$version" >> "$TEMP_VERSIONS"
        echo -e "${GREEN}✓ $version${NC}"
    else
        echo "$package|N/A" >> "$TEMP_VERSIONS"
        echo -e "${RED}✗ Not found${NC}"
    fi
done

# Function to get latest version from temp file
get_latest_from_file() {
    local pkg=$1
    grep "^${pkg}|" "$TEMP_VERSIONS" | cut -d'|' -f2
}

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Current versions in package.json files${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Find all package.json files and check versions
find packages -name "package.json" -type f | while read file; do
    package_name=$(jq -r '.name' "$file")
    has_external=false
    
    for ext_pkg in "${EXTERNAL_PACKAGES[@]}"; do
        latest_version=$(get_latest_from_file "$ext_pkg")
        
        # Check dependencies
        current_version=$(jq -r ".dependencies.\"$ext_pkg\" // empty" "$file")
        if [ -n "$current_version" ] && [ "$current_version" != "null" ]; then
            if [ "$has_external" = false ]; then
                echo -e "${CYAN}📦 $package_name${NC}"
                has_external=true
            fi
            
            if [ -n "$latest_version" ] && [ "$latest_version" != "N/A" ]; then
                current_norm=$(normalize_version "$current_version")
                latest_norm=$(normalize_version "$latest_version")
                
                if [ "$current_norm" = "$latest_norm" ]; then
                    echo -e "  ${GREEN}✓${NC} $ext_pkg (dependencies): $current_version ${GREEN}[latest: $latest_version]${NC}"
                else
                    echo -e "  ${YELLOW}⚠${NC} $ext_pkg (dependencies): $current_version ${YELLOW}[latest: $latest_version]${NC}"
                fi
            else
                echo -e "  ${CYAN}•${NC} $ext_pkg (dependencies): $current_version"
            fi
        fi
        
        # Check devDependencies
        current_version=$(jq -r ".devDependencies.\"$ext_pkg\" // empty" "$file")
        if [ -n "$current_version" ] && [ "$current_version" != "null" ]; then
            if [ "$has_external" = false ]; then
                echo -e "${CYAN}📦 $package_name${NC}"
                has_external=true
            fi
            
            if [ -n "$latest_version" ] && [ "$latest_version" != "N/A" ]; then
                current_norm=$(normalize_version "$current_version")
                latest_norm=$(normalize_version "$latest_version")
                
                if [ "$current_norm" = "$latest_norm" ]; then
                    echo -e "  ${GREEN}✓${NC} $ext_pkg (devDependencies): $current_version ${GREEN}[latest: $latest_version]${NC}"
                else
                    echo -e "  ${YELLOW}⚠${NC} $ext_pkg (devDependencies): $current_version ${YELLOW}[latest: $latest_version]${NC}"
                fi
            else
                echo -e "  ${CYAN}•${NC} $ext_pkg (devDependencies): $current_version"
            fi
        fi
        
        # Check peerDependencies
        current_version=$(jq -r ".peerDependencies.\"$ext_pkg\" // empty" "$file")
        if [ -n "$current_version" ] && [ "$current_version" != "null" ]; then
            if [ "$has_external" = false ]; then
                echo -e "${CYAN}📦 $package_name${NC}"
                has_external=true
            fi
            
            if [ -n "$latest_version" ] && [ "$latest_version" != "N/A" ]; then
                current_norm=$(normalize_version "$current_version")
                latest_norm=$(normalize_version "$latest_version")
                
                if [ "$current_norm" = "$latest_norm" ]; then
                    echo -e "  ${GREEN}✓${NC} $ext_pkg (peerDependencies): $current_version ${GREEN}[latest: $latest_version]${NC}"
                else
                    echo -e "  ${YELLOW}⚠${NC} $ext_pkg (peerDependencies): $current_version ${YELLOW}[latest: $latest_version]${NC}"
                fi
            else
                echo -e "  ${CYAN}•${NC} $ext_pkg (peerDependencies): $current_version"
            fi
        fi
    done
    
    if [ "$has_external" = true ]; then
        echo ""
    fi
done

# Check root package.json pnpm.overrides
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📦 Root package.json (pnpm.overrides)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

for ext_pkg in "${EXTERNAL_PACKAGES[@]}"; do
    current_version=$(jq -r ".pnpm.overrides.\"$ext_pkg\" // empty" package.json)
    latest_version=$(get_latest_from_file "$ext_pkg")
    
    if [ -n "$current_version" ] && [ "$current_version" != "null" ]; then
        if [ -n "$latest_version" ] && [ "$latest_version" != "N/A" ]; then
            current_norm=$(normalize_version "$current_version")
            latest_norm=$(normalize_version "$latest_version")
            
            if [ "$current_norm" = "$latest_norm" ]; then
                echo -e "  ${GREEN}✓${NC} $ext_pkg: $current_version ${GREEN}[latest: $latest_version]${NC}"
            else
                echo -e "  ${YELLOW}⚠${NC} $ext_pkg: $current_version ${YELLOW}[latest: $latest_version]${NC}"
            fi
        else
            echo -e "  ${CYAN}•${NC} $ext_pkg: $current_version"
        fi
    fi
done

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Check complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}Legend:${NC}"
echo -e "  ${GREEN}✓${NC} = Up to date with latest version"
echo -e "  ${YELLOW}⚠${NC} = Update available (current < latest)"
echo -e "  ${CYAN}•${NC} = Version info not available"
echo ""
echo -e "${YELLOW}To update external packages to latest versions, run:${NC}"
echo -e "  ${CYAN}pnpm run update:external${NC}"
echo ""
