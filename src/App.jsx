import React from 'react';
import Table from './components/Table';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <Table />
    </TableProvider>
  );
}

export default App;
