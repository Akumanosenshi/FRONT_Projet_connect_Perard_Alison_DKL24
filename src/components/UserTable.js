import React, { useEffect, useState } from 'react';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Liste des utilisateurs inscrits</h2>
            <table>
                <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Date de Naissance</th>
                    <th>Ville</th>
                    <th>Code Postal</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.birthDate}</td>
                            <td>{user.city}</td>
                            <td>{user.postalCode}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">Aucun utilisateur inscrit pour le moment.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
