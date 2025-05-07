import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ request }: LoaderFunctionArgs) {
  const sourceCode = `import React, { useState, useRef, useEffect } from 'react';
  import { 
    FileText, Search, GitBranch, Settings, Terminal, Bug, Palette, 
    Layout, Sidebar, Maximize, Minimize, Code, List, Map, 
    ChevronDown, ChevronRight, X, Plus, Split, Type, 
    Circle, Square, Triangle, Zap, Cpu, Box
  } from 'lucide-react';
  import { motion, AnimatePresence } from 'framer-motion';
  
  const VSCodeClone = () => {
    const [sidebarPosition, setSidebarPosition] = useState('left');
    const [secondarySidebarVisible, setSecondarySidebarVisible] = useState(false);
    const [panelPosition, setPanelPosition] = useState('bottom');
    const [panelAlignment, setPanelAlignment] = useState('center');
    const [panelMaximized, setPanelMaximized] = useState(false);
    const [layoutMode, setLayoutMode] = useState('default');
    const [activeEditor, setActiveEditor] = useState('welcome');
    const [editors, setEditors] = useState([
      { id: 'welcome', title: 'Welcome', content: 'Welcome to VSCode Clone', group: 0 },
      { id: 'readme', title: 'README.md', content: '# Project Documentation', group: 0 }
    ]);
    const [editorGroups, setEditorGroups] = useState([0]);
    const [showMinimap, setShowMinimap] = useState(true);
    const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [activeSidebarTab, setActiveSidebarTab] = useState('explorer');
    const [activePanelTab, setActivePanelTab] = useState('problems');
  
    const toggleSidebarPosition = () => {
      setSidebarPosition(prev => prev === 'left' ? 'right' : 'left');
    };
  
    const toggleSecondarySidebar = () => {
      setSecondarySidebarVisible(prev => !prev);
    };
  
    const togglePanelPosition = () => {
      const positions = ['bottom', 'left', 'right'];
      const currentIndex = positions.indexOf(panelPosition);
      setPanelPosition(positions[(currentIndex + 1) % positions.length]);
    };
  
    const togglePanelAlignment = () => {
      const alignments = ['center', 'left', 'right', 'justify'];
      const currentIndex = alignments.indexOf(panelAlignment);
      setPanelAlignment(alignments[(currentIndex + 1) % alignments.length]);
    };
  
    const togglePanelMaximized = () => {
      setPanelMaximized(prev => !prev);
    };
  
    const toggleLayoutMode = () => {
      const modes = ['default', 'zen', 'centered'];
      const currentIndex = modes.indexOf(layoutMode);
      setLayoutMode(modes[(currentIndex + 1) % modes.length]);
    };
  
    const openFile = (fileId) => {
      setActiveEditor(fileId);
    };
  
    const splitEditor = (direction) => {
      const newGroup = Math.max(...editorGroups) + 1;
      setEditorGroups([...editorGroups, newGroup]);
      setActiveEditor(editors[0].id);
    };
  
    return (
      <div className={\`flex flex-col h-screen \${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}\`}>
        {/* Title Bar */}
        <div className={\`flex items-center justify-between px-4 py-2 \${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} border-b \${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}\`}>
          <div className="flex items-center">
            <span className="font-semibold">VSCode Clone</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleLayoutMode} className="p-1 rounded hover:bg-gray-700">
              <Layout size={16} />
            </button>
            <button onClick={toggleSidebarPosition} className="p-1 rounded hover:bg-gray-700">
              <Sidebar size={16} />
            </button>
            <button onClick={togglePanelMaximized} className="p-1 rounded hover:bg-gray-700">
              {panelMaximized ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Primary Sidebar */}
          <div className={\`\${sidebarPosition === 'left' ? 'order-first' : 'order-last'} \${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} w-12 flex flex-col items-center py-4 border-r \${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}\`}>
            <button 
              onClick={() => setActiveSidebarTab('explorer')} 
              className={\`p-2 mb-4 rounded \${activeSidebarTab === 'explorer' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''}\`}
            >
              <FileText size={20} />
            </button>
            <button 
              onClick={() => setActiveSidebarTab('search')} 
              className={\`p-2 mb-4 rounded \${activeSidebarTab === 'search' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''}\`}
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setActiveSidebarTab('git')} 
              className={\`p-2 mb-4 rounded \${activeSidebarTab === 'git' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''}\`}
            >
              <GitBranch size={20} />
            </button>
            <button 
              onClick={() => setActiveSidebarTab('debug')} 
              className={\`p-2 mb-4 rounded \${activeSidebarTab === 'debug' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''}\`}
            >
              <Bug size={20} />
            </button>
            <button 
              onClick={() => setActiveSidebarTab('extensions')} 
              className={\`p-2 mb-4 rounded \${activeSidebarTab === 'extensions' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''}\`}
            >
              <Box size={20} />
            </button>
            <div className="mt-auto">
              <button 
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} 
                className="p-2 rounded hover:bg-gray-700"
              >
                <Palette size={20} />
              </button>
              <button 
                onClick={() => setActiveSidebarTab('settings')} 
                className={\`p-2 mt-4 rounded \${activeSidebarTab === 'settings' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''}\`}
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
  
          {/* Secondary Sidebar */}
          <AnimatePresence>
            {secondarySidebarVisible && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                exit={{ width: 0 }}
                className={\`\${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} border-r \${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} overflow-hidden\`}
              >
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Outline</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <ChevronDown size={16} className="mr-1" />
                      <span>Main Function</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <ChevronRight size={16} className="mr-1" />
                      <span>Variables</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <ChevronRight size={16} className="mr-1" />
                      <span>Functions</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
  
          {/* Editor Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Editor Tabs */}
            <div className={\`flex items-center \${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} border-b \${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}\`}>
              {editors.filter(editor => editor.group === editorGroups[0]).map(editor => (
                <button
                  key={editor.id}
                  onClick={() => openFile(editor.id)}
                  className={\`px-4 py-2 text-sm flex items-center \${activeEditor === editor.id ? (theme === 'dark' ? 'bg-gray-900' : 'bg-white') : ''}\`}
                >
                  <FileText size={16} className="mr-2" />
                  {editor.title}
                  <button className="ml-2 p-1 rounded-full hover:bg-gray-700">
                    <X size={12} />
                  </button>
                </button>
              ))}
              <button className="p-2 ml-auto" onClick={() => splitEditor('right')}>
                <Split size={16} />
              </button>
            </div>
  
            {/* Editor Content */}
            <div className="flex-1 flex overflow-hidden">
              {editorGroups.map(group => (
                <div key={group} className="flex-1 flex flex-col overflow-hidden border-r last:border-r-0">
                  <div className="flex-1 overflow-auto p-4">
                    {editors.find(editor => editor.id === activeEditor && editor.group === group)?.content}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Status Bar */}
            <div className={\`flex items-center justify-between px-4 py-1 text-xs \${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} border-t \${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}\`}>
              <div className="flex items-center space-x-4">
                <span>main*</span>
                <span>UTF-8</span>
                <span>LF</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Ln 1, Col 1</span>
                <span>Spaces: 2</span>
                <span>TypeScript</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Panel */}
        <div 
          className={\`\${panelMaximized ? 'h-2/3' : 'h-48'} \${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} border-t \${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} flex flex-col\`}
          style={{
            order: panelPosition === 'bottom' ? 1 : 0,
            width: panelPosition !== 'bottom' ? '300px' : 'auto'
          }}
        >
          <div className={\`flex items-center \${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-1\`}>
            <button 
              onClick={() => setActivePanelTab('problems')} 
              className={\`px-3 py-1 text-sm \${activePanelTab === 'problems' ? (theme === 'dark' ? 'bg-gray-800' : 'bg-white') : ''}\`}
            >
              Problems
            </button>
            <button 
              onClick={() => setActivePanelTab('terminal')} 
              className={\`px-3 py-1 text-sm \${activePanelTab === 'terminal' ? (theme === 'dark' ? 'bg-gray-800' : 'bg-white') : ''}\`}
            >
              Terminal
            </button>
            <button 
              onClick={() => setActivePanelTab('output')} 
              className={\`px-3 py-1 text-sm \${activePanelTab === 'output' ? (theme === 'dark' ? 'bg-gray-800' : 'bg-white') : ''}\`}
            >
              Output
            </button>
            <button 
              onClick={togglePanelPosition} 
              className="ml-auto p-1 rounded hover:bg-gray-700"
            >
              <Sidebar size={16} />
            </button>
            <button 
              onClick={togglePanelAlignment} 
              className="p-1 rounded hover:bg-gray-700"
            >
              <Layout size={16} />
            </button>
            <button 
              onClick={togglePanelMaximized} 
              className="p-1 rounded hover:bg-gray-700"
            >
              {panelMaximized ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {activePanelTab === 'problems' && (
              <div>
                <div className="flex items-center mb-2">
                  <span className="font-semibold">Problems (3)</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">Error</span>
                    <span>Missing semicolon (1:12)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">Warning</span>
                    <span>Unused variable 'count' (3:5)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">Warning</span>
                    <span>Function is too long (15:1)</span>
                  </div>
                </div>
              </div>
            )}
            {activePanelTab === 'terminal' && (
              <div className="font-mono text-sm">
                <div className="mb-2">$ npm start</div>
                <div className="text-green-500">&gt; project@1.0.0 start</div>
                <div className="text-blue-500">&gt; react-scripts start</div>
                <div className="mt-2">Starting the development server...</div>
              </div>
            )}
            {activePanelTab === 'output' && (
              <div className="font-mono text-sm">
                <div>[Info] Loading extensions...</div>
                <div>[Info] 5 extensions loaded</div>
                <div>[Info] Initializing workspace...</div>
                <div>[Info] Workspace ready</div>
              </div>
            )}
          </div>
        </div>
  
        {/* Footer */}
        <div className={\`px-4 py-2 text-xs text-center \${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} border-t \${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}\`}>
          <div>
            created by <a href="https://space.coze.cn" className="text-blue-500 hover:underline">coze space</a>
          </div>
          <div>页面内容均由 AI 生成，仅供参考</div>
        </div>
      </div>
    );
  };
  
  export default VSCodeClone;`;

  return json({
    sourceCode,
  });
}
