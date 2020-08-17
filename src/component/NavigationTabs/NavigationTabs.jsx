import React, { useState, useEffect, useRef } from 'react';
import TabsInstance from './TabsInstance.jsx';
import LoginInstance from './LoginInstance.jsx';
import { signInEmployee } from '../../actions/employeeActions.js';
import { setStore, getStore } from './storage';

export default function NavigationTabs() {
    const [employee, setEmployee] = useState(null);

    const signIn = (newEmployee) => {
        signInEmployee(
            newEmployee.firstName,
            newEmployee.lastName,
            newEmployee.type
        )
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => console.log('HII', error.data));
        setEmployee(newEmployee);
    };

    console.log(employee)

    useEffect(() => {
        if (employee && employee.id) {
            localStorage.setItem('employee', employee.id);
        }
    }, [employee]);

    return employee ? (
        <TabsInstance employeeId={localStorage.getItem('employee')} />
    ) : (
        <LoginInstance setEmployee={signIn} />
    );
}
