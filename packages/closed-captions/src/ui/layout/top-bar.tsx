type TopBarProps = {
  hasDoc: boolean;
  onImport: () => void;
  onExportSrt: () => void;
  onExportVtt: () => void;
  onRevert: () => void;
  onSave: () => void;
  onPublish: () => void;
};

export function TopBar({
  hasDoc,
  onImport,
  onExportSrt,
  onExportVtt,
  onRevert,
  onSave,
  onPublish,
}: TopBarProps) {
  return (
    <header className="ccTopBar">
      <div className="ccBrand">Twick CC</div>
      <div className="ccTopBarSpacer" />
      <button className="ccBtn" type="button" onClick={onImport}>
        Import
      </button>
      <div className="ccBtnGroup">
        <button className="ccBtn" type="button" disabled={!hasDoc} onClick={onExportSrt}>
          Export SRT
        </button>
        <button className="ccBtn" type="button" disabled={!hasDoc} onClick={onExportVtt}>
          Export VTT
        </button>
      </div>
      <button className="ccBtn" type="button" disabled={!hasDoc} onClick={onRevert}>
        Revert
      </button>
      <button className="ccBtn ccBtnPrimary" type="button" disabled={!hasDoc} onClick={onSave}>
        Save
      </button>
      <button className="ccBtn" type="button" onClick={onPublish}>
        Publish
      </button>
    </header>
  );
}
