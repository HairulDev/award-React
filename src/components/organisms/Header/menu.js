
import env from 'configs/vars';
import { useEffect } from 'react';

const user = JSON.parse(localStorage.getItem('profile'));

const navItems = [{
    name: 'Home',
    url: `${env.publicUrl}`
},
{
    name: 'Cards',
    url: `${env.publicUrl}/cards`
},
{
    name: 'Profile',
    url: `${env.publicUrl}/account/${user?.result._id}`
},
{
    name: 'Logout',
    url: `${env.publicUrl}/logout`
}];

export default navItems;