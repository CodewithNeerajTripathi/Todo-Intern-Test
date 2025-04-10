export default function TodosLayout({ children }) {
    return (
      <div style={{ display: 'flex ', flexDirection:'column', alignItems:'center' , height: '100vh' }}>
        <div style={{ width: '60%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
          {children}
        </div>
        <div style={{ flex: 1, padding: 20 }}>
          <p>Select a todo to view or edit</p>
        </div>
      </div>
    );
  }
  