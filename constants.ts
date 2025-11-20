import { ActivityLog, BackupStat, ChartData, NavItem, ServerInventory, IQRequest, MasterEntity, User } from './types';
import { LayoutDashboard, Database, ShieldCheck, FileText, Settings, Users, Server, MapPin, Monitor, Cloud, HardDrive, Lock, Shield, Briefcase } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { 
    label: 'IQ Master', 
    icon: Database, 
    id: 'iq-master',
    children: [
      { label: 'IQ Checklist Request', id: 'iq-required' },
      { label: 'IQ Review', id: 'iq-review' },
      { label: 'IQ Details', id: 'iq-details' },
    ]
  },
  { 
    label: 'Security', 
    icon: ShieldCheck, 
    id: 'security',
    children: [
      { label: 'Port Management', id: 'port-management' },
      { label: 'DB Credentials', id: 'db-credentials' },
    ]
  },
  { label: 'Reports', icon: FileText, id: 'reports' },
  { 
    label: 'Master', 
    icon: Settings, 
    id: 'master',
    children: [
      { label: 'Server Inventory', id: 'inventory' },
      { label: 'Locations', id: 'locations' },
      { label: 'Operating Systems', id: 'os' },
      { label: 'Infrastructure', id: 'infrastructure' },
      { label: 'Database Providers', id: 'db-providers' },
      { label: 'AntiVirus', id: 'antivirus' },
      { label: 'Environments', id: 'environments' },
      { label: 'Dept. Name', id: 'dept-name' },
    ]
  },
  { 
    label: 'User Administration', 
    icon: Users, 
    id: 'user-admin',
    children: [
      { label: 'User Master', id: 'user-master' },
      { label: 'Role Master', id: 'role-master' },
    ]
  },
];

export const RECENT_ACTIVITY: ActivityLog[] = [
  { id: '1', action: 'System Backup', user: 'System', timestamp: '10:42 AM', status: 'success', details: 'Daily incremental backup completed.' },
  { id: '2', action: 'IQ Validation', user: 'J. Doe', timestamp: '09:15 AM', status: 'warning', details: 'Validation completed with 2 minor warnings.' },
  { id: '3', action: 'User Access', user: 'M. Smith', timestamp: '08:30 AM', status: 'error', details: 'Failed login attempt detected.' },
  { id: '4', action: 'Config Update', user: 'Admin', timestamp: 'Yesterday', status: 'success', details: 'Retention policy updated.' },
];

// Updated per Section 4.2: Total Servers, Total IQ Records, Total Backups, Pending Signatures
export const BACKUP_STATS: BackupStat[] = [
  { label: 'Total Servers', value: '142', trend: 4, trendDirection: 'up', icon: 'server' },
  { label: 'Total IQ Records', value: '842', trend: 12, trendDirection: 'up', icon: 'file-check' },
  { label: 'Total Backups', value: '1,284', trend: 0.2, trendDirection: 'up', icon: 'database' },
  { label: 'Pending Signatures', value: '9', trend: 2, trendDirection: 'down', icon: 'signature' },
];

export const CHART_DATA: ChartData[] = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 600 },
  { name: 'Sat', value: 200 },
  { name: 'Sun', value: 250 },
];

// Initial Mock Data for Modules
export const INITIAL_SERVERS: ServerInventory[] = [
  { id: '1', hostname: 'US-EAST-WEB-01', ipAddress: '10.0.1.15', os: 'Windows Server 2019', location: 'New York DC', environment: 'Production', status: 'Active' },
  { id: '2', hostname: 'US-EAST-DB-01', ipAddress: '10.0.1.20', os: 'RHEL 8.4', location: 'New York DC', environment: 'Production', status: 'Active' },
  { id: '3', hostname: 'EU-WEST-APP-02', ipAddress: '192.168.5.10', os: 'Ubuntu 20.04', location: 'London', environment: 'Staging', status: 'Maintenance' },
  { id: '4', hostname: 'DEV-TEST-01', ipAddress: '172.16.0.55', os: 'Windows Server 2022', location: 'Austin HQ', environment: 'Development', status: 'Active' },
];

export const INITIAL_IQ_REQUESTS: IQRequest[] = [
  { id: '1', requestId: 'REQ-2024-001', requester: 'Sarah Connor', serverName: 'US-EAST-WEB-01', status: 'Approved', submissionDate: '2024-02-10' },
  { id: '2', requestId: 'REQ-2024-002', requester: 'John Smith', serverName: 'DEV-TEST-01', status: 'Pending Approval', submissionDate: '2024-02-14' },
  { id: '3', requestId: 'REQ-2024-003', requester: 'Mike Ross', serverName: 'EU-WEST-APP-02', status: 'Draft', submissionDate: '2024-02-15' },
];

export const INITIAL_USERS: User[] = [
  { id: '1', name: 'Alex Morgan', role: 'Administrator', avatar: '', email: 'alex.m@devopshub.com', status: 'Active', lastLogin: '2 mins ago' },
  { id: '2', name: 'Sarah Connor', role: 'IQ Reviewer', avatar: '', email: 'sarah.c@devopshub.com', status: 'Active', lastLogin: '1 day ago' },
  { id: '3', name: 'John Doe', role: 'Viewer', avatar: '', email: 'john.d@devopshub.com', status: 'Inactive', lastLogin: '2 weeks ago' },
];

// Master Data Mocks
export const INITIAL_LOCATIONS: MasterEntity[] = [
  { id: '1', name: 'New York DC', status: 'Active', description: 'Primary East Coast Data Center' },
  { id: '2', name: 'London', status: 'Active', description: 'EU Region' },
  { id: '3', name: 'Austin HQ', status: 'Active', description: 'On-premise Development Lab' },
];

export const INITIAL_OS: MasterEntity[] = [
  { id: '1', name: 'Windows Server 2019', status: 'Active', description: 'Standard Edition' },
  { id: '2', name: 'Windows Server 2022', status: 'Active', description: 'Datacenter Edition' },
  { id: '3', name: 'RHEL 8.4', status: 'Active', description: 'Red Hat Enterprise Linux' },
  { id: '4', name: 'Ubuntu 20.04', status: 'Active', description: 'LTS' },
];

export const INITIAL_INFRASTRUCTURE: MasterEntity[] = [
  { id: '1', name: 'AWS', status: 'Active', description: 'Amazon Web Services' },
  { id: '2', name: 'Azure', status: 'Active', description: 'Microsoft Azure' },
  { id: '3', name: 'VMware', status: 'Active', description: 'On-Premise vSphere' },
];

export const INITIAL_DB_PROVIDERS: MasterEntity[] = [
  { id: '1', name: 'MSSQL', status: 'Active', description: 'Microsoft SQL Server' },
  { id: '2', name: 'PostgreSQL', status: 'Active', description: 'Open Source Object-Relational' },
  { id: '3', name: 'MongoDB', status: 'Active', description: 'NoSQL Document DB' },
];

export const INITIAL_ANTIVIRUS: MasterEntity[] = [
  { id: '1', name: 'CrowdStrike', status: 'Active', description: 'Falcon Sensor' },
  { id: '2', name: 'Symantec', status: 'Inactive', description: 'Legacy Endpoint Protection' },
  { id: '3', name: 'Windows Defender', status: 'Active', description: 'Server Edition' },
];

export const INITIAL_ENVIRONMENTS: MasterEntity[] = [
  { id: '1', name: 'Production', status: 'Active', description: 'Live customer facing' },
  { id: '2', name: 'Staging', status: 'Active', description: 'Pre-production' },
  { id: '3', name: 'Development', status: 'Active', description: 'Internal testing' },
];

export const INITIAL_DEPARTMENTS: MasterEntity[] = [
  { id: '1', name: 'IT Operations', status: 'Active', description: 'Infrastructure Support' },
  { id: '2', name: 'Software Engineering', status: 'Active', description: 'Product Development' },
  { id: '3', name: 'Quality Assurance', status: 'Active', description: 'Testing and Validation' },
];