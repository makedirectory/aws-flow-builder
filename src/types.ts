export type NodeType =
  | "VPC"
  | "Subnet (Public)"
  | "Subnet (Private)"
  | "Route Table"
  | "NACL"
  | "Internet Gateway"
  | "NAT Gateway"
  | "ECS Cluster"
  | "ECS Service"
  | "EC2"
  | "ALB"
  | "Target Group"
  | "Security Group"
  | "RDS"
  | "S3"
  | "ECR"
  | "CloudWatch"
  | "IAM Role";

export interface FlowNode {
  id: string;
  type: NodeType;
  x: number; y: number; w: number; h: number;
  props: { name: string; cidr?: string; public?: boolean; az?: string; notes?: string };
}

export interface FlowEdge { id: string; from: string; to: string; rel: "depends_on"|"attached_to"|"routes_to"|"allows"|"targets"; }

export interface Pan { x: number; y: number; scale: number; }

export interface PaletteItem { type: NodeType; color: string; defaults?: Partial<FlowNode["props"]>; }
