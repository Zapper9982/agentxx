'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconHome,
  IconLayoutDashboard,
  IconSeo,
  IconEdit,
  IconDatabasePlus,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './navbarminimal.module.css';
import { ActionToggle } from '../darkmode/ActionToggle';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
  { link: '/seo_', label: 'SEO Optimization', icon: IconSeo },
  { link: '/updatecontent', label: 'Content Update', icon: IconEdit },
  { link: '/content_add', label: 'Content Add', icon: IconDatabasePlus },
  { link: '/broken_links', label: 'Broken Link Provider', icon: IconDatabasePlus },
];

export function NavbarMinimal() {
  // Get current pathname from Next.js router
  const pathname = usePathname();

  // Use <Link> instead of <a> to enable client-side navigation
  const links = data.map((item) => (
    <li key={item.label}>
      <Link
        href={item.link}
        className={`${classes.link} ${pathname === item.link ? classes.active : ''}`}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    </li>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between" align="center" px="md">
          <span className={classes.logo} style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '0.1rem', color: '#fff', textDecoration: 'none', textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' }}>My App</span>
          <ActionToggle size="lg" style={{ marginLeft: '1rem' }} />
        </Group>
        <ul className={classes.linkList} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '1.5rem', gap: '2rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
          {links}
        </ul>
        <style jsx>{`
          .navbar {
            background-color: #333;
            padding: 1rem;
            border-bottom: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #fff;
          }
          .navbarMain {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .linkList {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 1rem;
          }
          .linkList li {
            margin: 0 1rem;
          }
          .linkList a {
            color: #fff;
            text-decoration: none;
            transition: color 0.2s ease;
            font-weight: bold;
            text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
          }
          .linkList a:hover {
            color: #ccc;
          }
          .linkList li {
            margin: 0 1rem;
          }
          .linkList a {
            color: #fff;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .linkList a:hover {
            color: #ccc;
          }
        `}</style>
      </div>
    </nav>
  );
}
