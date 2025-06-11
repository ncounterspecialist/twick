const TwickEditor = ({leftPanel, rightPanel, videoProps}: {leftPanel: React.ReactNode, rightPanel: React.ReactNode, videoProps: any}) => {
  return <div>
    <div>
        {leftPanel}
    </div>
    {
        JSON.stringify(videoProps)
    }
    <div>
        {rightPanel}
    </div>
  </div>;
};

export default TwickEditor;