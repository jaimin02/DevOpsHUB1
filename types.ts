export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email?: string;
  status?: 'Active' | 'Inactive';
  lastLogin?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

export interface BackupStat {
  label: string;
  value: string | number;
  trend: number; // percentage
  trendDirection: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface NavItem {
  label: string;
  icon?: any;
  id: string;
  children?: { label: string; id: string }[];
}

// Master Data Interfaces
export interface ServerInventory {
  id: string;
  hostname: string;
  ipAddress: string;
  os: string;
  location: string;
  environment: string;
  status: 'Active' | 'Decommissioned' | 'Maintenance';
}

export interface MasterEntity {
  id: string;
  name: string;
  description?: string;
  status: 'Active' | 'Inactive';
}

// Security Interfaces
export interface PortRule {
  id: string;
  serverId: string;
  port: number;
  protocol: 'TCP' | 'UDP';
  description: string;
  action: 'Allow' | 'Deny';
}

export interface DbCredential {
  id: string;
  serverId: string;
  dbName: string;
  username: string;
  lastRotated: string;
}

// IQ Interfaces
export interface IQRequest {
  id: string;
  requestId: string;
  requester: string;
  serverName: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Sent Back';
  submissionDate: string;
}

export interface IQDetail {
  id: string;
  requestId: string;
  currentStage: 'Checklist' | 'Protocol' | 'Script' | 'Report';
  progress: number;
}

// User Admin Interfaces
export interface Role {
  id: string;
  name: string;
  usersCount: number;
  description: string;
}
