import React, { useState } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  // Add more customer fields as needed
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <div className="customers-list">
        {customers.map((customer) => (
          <div key={customer.id}>
            {customer.name} - {customer.email}
          </div>
        ))}
        {customers.length === 0 && <p>No customers found</p>}
      </div>
    </div>
  );
};

export default Customers;