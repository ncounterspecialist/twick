#!/bin/bash

# Test script for publish workflow logic
# This simulates the key steps of the publish workflow to verify it works correctly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test version (simulating a tag like v0.14.20)
TEST_VERSION="0.14.20"
BACKUP_DIR=".test-backup-$(date +%s)"

echo -e "${YELLOW}🧪 Testing publish workflow logic locally${NC}"
echo "Test version: $TEST_VERSION"
echo ""

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function to backup files
backup_file() {
    local file=$1
    if [ -f "$file" ]; then
        mkdir -p "$BACKUP_DIR/$(dirname "$file")"
        cp "$file" "$BACKUP_DIR/$file"
    fi
}

# Function to restore files
restore_files() {
    echo -e "\n${YELLOW}Restoring original files...${NC}"
    if [ -d "$BACKUP_DIR" ]; then
        cp -r "$BACKUP_DIR"/* .
        rm -rf "$BACKUP_DIR"
        echo -e "${GREEN}✓ Files restored${NC}"
    fi
}

# Trap to restore files on exit
trap restore_files EXIT

# Backup critical files
echo -e "${YELLOW}Creating backups...${NC}"
backup_file "package.json"
find packages -name "package.json" -type f | while read file; do
    backup_file "$file"
done
echo -e "${GREEN}✓ Backups created${NC}\n"

# Step 1: Extract version (simulated)
echo -e "${YELLOW}Step 1: Simulating version extraction${NC}"
VERSION=$TEST_VERSION
echo "Extracted version: $VERSION"
echo ""

# Step 2: Update package versions
echo -e "${YELLOW}Step 2: Updating package versions${NC}"
find packages -name "package.json" -type f | while read file; do
    echo "Updating version in $file to $VERSION"
    jq --arg version "$VERSION" '.version = $version' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done

# Update root package.json version
jq --arg version "$VERSION" '.version = $version' package.json > package.json.tmp && mv package.json.tmp package.json
echo -e "${GREEN}✓ Package versions updated${NC}\n"

# Step 3: Update pnpm.overrides (internal packages only)
echo -e "${YELLOW}Step 3: Updating pnpm.overrides (internal packages only)${NC}"
INTERNAL_PACKAGES="@twick/media-utils @twick/canvas @twick/timeline @twick/live-player @twick/visualizer @twick/video-editor @twick/studio @twick/render-server @twick/examples @twick/documentation @twick/cloud-export-video @twick/cloud-transcript @twick/cloud-subtitle-video @twick/mcp-agent"
internal_json=$(echo "$INTERNAL_PACKAGES" | jq -R -s 'split(" ") | map(select(length > 0))')

# Check current overrides
echo "Current pnpm.overrides:"
jq '.pnpm.overrides // {}' package.json

jq --arg version "$VERSION" --argjson internal_packages "$internal_json" '
  def is_internal(pkg_name):
    internal_packages | index(pkg_name) != null;
  
  if .pnpm.overrides then
    .pnpm.overrides |= with_entries(
      if (.key | startswith("@twick/")) and is_internal(.key) then
        .value = "^" + $version
      else
        .
      end
    )
  else
    .
  end
' package.json > package.json.tmp && mv package.json.tmp package.json

echo "Updated pnpm.overrides:"
jq '.pnpm.overrides // {}' package.json

# Verify external packages weren't updated
if jq -e '.pnpm.overrides."@twick/core" // empty' package.json | grep -q "$VERSION"; then
    echo -e "${RED}❌ ERROR: External package @twick/core was updated!${NC}"
    exit 1
else
    echo -e "${GREEN}✓ External packages (@twick/core) were NOT updated${NC}"
fi
echo ""

# Step 4: Update internal dependencies
echo -e "${YELLOW}Step 4: Updating internal dependencies${NC}"
echo "Internal packages: $INTERNAL_PACKAGES"

update_twick_version() {
    local file=$1
    local version=$2
    local internal_json=$(echo "$INTERNAL_PACKAGES" | jq -R -s 'split(" ") | map(select(length > 0))')
    jq --arg version "$version" --argjson internal_packages "$internal_json" '
      def is_internal(pkg_name):
        internal_packages | index(pkg_name) != null;
      
      def update_twick_deps(deps):
        if deps then
          deps | with_entries(
            if (.key | startswith("@twick/")) and is_internal(.key) then
              (.value | tostring) as $val |
              if $val == "workspace:*" then
                .value = $version
              elif ($val | startswith("workspace:")) then
                .value = $version
              elif ($val | startswith("^")) then
                .value = "^" + $version
              elif ($val | startswith("~")) then
                .value = "~" + $version
              elif ($val | startswith(">=")) then
                .value = ">=" + $version
              elif ($val | startswith("<=")) then
                .value = "<=" + $version
              elif ($val | startswith(">")) then
                .value = ">" + $version
              elif ($val | startswith("<")) then
                .value = "<" + $version
              elif ($val | test("^[0-9]")) then
                .value = $version
              else
                .value = $version
              end
            else
              .
            end
          )
        else
          deps
        end;
      
      (if .dependencies then .dependencies = update_twick_deps(.dependencies) else . end) |
      (if .devDependencies then .devDependencies = update_twick_deps(.devDependencies) else . end) |
      (if .peerDependencies then .peerDependencies = update_twick_deps(.peerDependencies) else . end) |
      (if .optionalDependencies then .optionalDependencies = update_twick_deps(.optionalDependencies) else . end)
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
}

# Test on visualizer package (has external dependencies)
TEST_PACKAGE="packages/visualizer/package.json"
if [ -f "$TEST_PACKAGE" ]; then
    echo "Testing on: $TEST_PACKAGE"
    echo "Before update:"
    echo "  @twick/media-utils: $(jq -r '.dependencies."@twick/media-utils" // "N/A"' "$TEST_PACKAGE")"
    echo "  @twick/core: $(jq -r '.dependencies."@twick/core" // .devDependencies."@twick/core" // "N/A"' "$TEST_PACKAGE")"
    echo "  @twick/2d: $(jq -r '.dependencies."@twick/2d" // "N/A"' "$TEST_PACKAGE")"
    echo "  @twick/cli: $(jq -r '.devDependencies."@twick/cli" // "N/A"' "$TEST_PACKAGE")"
    
    update_twick_version "$TEST_PACKAGE" "$VERSION"
    
    echo "After update:"
    echo "  @twick/media-utils: $(jq -r '.dependencies."@twick/media-utils" // "N/A"' "$TEST_PACKAGE")"
    echo "  @twick/core: $(jq -r '.dependencies."@twick/core" // .devDependencies."@twick/core" // "N/A"' "$TEST_PACKAGE")"
    echo "  @twick/2d: $(jq -r '.dependencies."@twick/2d" // "N/A"' "$TEST_PACKAGE")"
    echo "  @twick/cli: $(jq -r '.devDependencies."@twick/cli" // "N/A"' "$TEST_PACKAGE")"
    
    # Verify external packages weren't updated
    CORE_VERSION=$(jq -r '.dependencies."@twick/core" // .devDependencies."@twick/core" // empty' "$TEST_PACKAGE")
    if [ -n "$CORE_VERSION" ] && echo "$CORE_VERSION" | grep -q "$VERSION"; then
        echo -e "${RED}❌ ERROR: External package @twick/core was updated to $VERSION!${NC}"
        exit 1
    fi
    
    TWOD_VERSION=$(jq -r '.dependencies."@twick/2d" // empty' "$TEST_PACKAGE")
    if [ -n "$TWOD_VERSION" ] && echo "$TWOD_VERSION" | grep -q "$VERSION"; then
        echo -e "${RED}❌ ERROR: External package @twick/2d was updated to $VERSION!${NC}"
        exit 1
    fi
    
    CLI_VERSION=$(jq -r '.devDependencies."@twick/cli" // empty' "$TEST_PACKAGE")
    if [ -n "$CLI_VERSION" ] && echo "$CLI_VERSION" | grep -q "$VERSION"; then
        echo -e "${RED}❌ ERROR: External package @twick/cli was updated to $VERSION!${NC}"
        exit 1
    fi
    
    # Verify internal package was updated
    MEDIA_UTILS_VERSION=$(jq -r '.dependencies."@twick/media-utils" // empty' "$TEST_PACKAGE")
    if [ -n "$MEDIA_UTILS_VERSION" ]; then
        if echo "$MEDIA_UTILS_VERSION" | grep -q "$VERSION"; then
            echo -e "${GREEN}✓ Internal package @twick/media-utils was updated correctly${NC}"
        else
            echo -e "${YELLOW}⚠ @twick/media-utils version: $MEDIA_UTILS_VERSION (might be workspace:*)${NC}"
        fi
    fi
fi

# Update all packages
echo ""
echo "Updating all package.json files..."
find packages -name "package.json" -type f | while read file; do
    update_twick_version "$file" "$VERSION"
done

# Update root package.json if needed
if jq -e '.dependencies | keys[] | select(startswith("@twick/"))' package.json > /dev/null 2>&1 || \
   jq -e '.devDependencies | keys[] | select(startswith("@twick/"))' package.json > /dev/null 2>&1 || \
   jq -e '.peerDependencies | keys[] | select(startswith("@twick/"))' package.json > /dev/null 2>&1; then
    echo "Updating root package.json"
    update_twick_version "package.json" "$VERSION"
fi

echo -e "${GREEN}✓ Internal dependencies updated${NC}\n"

# Step 5: Verify version consistency
echo -e "${YELLOW}Step 5: Verifying version consistency${NC}"
TARGET_VERSION="$VERSION"
ERRORS=0

find packages -name "package.json" -type f | while read file; do
    PACKAGE_NAME=$(jq -r '.name' "$file")
    if [[ "$PACKAGE_NAME" == @twick/* ]]; then
        PACKAGE_VERSION=$(jq -r '.version' "$file")
        if [ "$PACKAGE_VERSION" != "$TARGET_VERSION" ]; then
            echo -e "${RED}❌ ERROR: $PACKAGE_NAME has version $PACKAGE_VERSION, expected $TARGET_VERSION${NC}"
            ERRORS=1
        else
            echo -e "${GREEN}✓ $PACKAGE_NAME: $PACKAGE_VERSION${NC}"
        fi
    fi
done

ROOT_VERSION=$(jq -r '.version' package.json)
if [ "$ROOT_VERSION" != "$TARGET_VERSION" ]; then
    echo -e "${RED}❌ ERROR: Root package.json has version $ROOT_VERSION, expected $TARGET_VERSION${NC}"
    ERRORS=1
else
    echo -e "${GREEN}✓ Root package.json: $ROOT_VERSION${NC}"
fi

if [ $ERRORS -eq 1 ]; then
    echo -e "${RED}❌ Version consistency check failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All @twick packages have version $TARGET_VERSION${NC}\n"

# Summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Test completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Summary:"
echo "  ✓ Package versions updated to $VERSION"
echo "  ✓ Internal dependencies updated"
echo "  ✓ External dependencies (@twick/core, @twick/2d, @twick/cli) were NOT updated"
echo "  ✓ Version consistency verified"
echo ""
echo "Files will be automatically restored on exit."
echo "To keep changes, cancel with Ctrl+C before the script exits."
