# 前后端API契约设计文档

## 1. 概述

本文档定义了简历制作应用的前后端API契约，确保前后端数据流的一致性和类型安全。

## 2. 基础约定

### 2.1 API响应格式

所有API响应遵循统一格式：

```typescript
// 成功响应
interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
}

// 错误响应
interface ApiErrorResponse {
  ok: false;
  error: string;
  code?: string;      // 错误代码，用于客户端国际化
  details?: unknown;  // 详细错误信息（开发环境）
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
```

### 2.2 HTTP状态码

| 状态码 | 使用场景 |
|--------|----------|
| 200 | GET/PUT请求成功 |
| 201 | POST创建成功 |
| 204 | DELETE删除成功 |
| 400 | 请求参数错误（验证失败）|
| 401 | 未认证/Token无效 |
| 403 | 无权限访问资源 |
| 404 | 资源不存在 |
| 409 | 资源冲突（如邮箱已注册）|
| 500 | 服务器内部错误 |

### 2.3 认证机制

- 使用 JWT (JSON Web Token) 进行身份认证
- Token 通过 `Authorization: Bearer <token>` Header 传递
- Token 有效期：24小时
- 刷新机制：前端在Token过期前自动刷新

## 3. API端点定义

### 3.1 认证模块 (Auth)

#### POST /api/auth/register - 用户注册

**Request:**
```typescript
interface RegisterRequest {
  username: string;      // 3-20字符，字母数字下划线
  email: string;         // 有效邮箱格式
  password: string;      // 至少8位，包含大小写字母和数字
}
```

**Response:**
```typescript
interface RegisterResponse {
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
  token: string;
  refreshToken: string;
}
```

**错误代码:**
- `EMAIL_EXISTS`: 邮箱已被注册
- `USERNAME_EXISTS`: 用户名已被使用
- `INVALID_PASSWORD`: 密码强度不足

#### POST /api/auth/login - 用户登录

**Request:**
```typescript
interface LoginRequest {
  username: string;  // 或email
  password: string;
}
```

**Response:**
```typescript
interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    name?: string;
  };
  token: string;
  refreshToken: string;
}
```

**错误代码:**
- `INVALID_CREDENTIALS`: 用户名或密码错误
- `ACCOUNT_LOCKED`: 账户被锁定（多次失败登录）

#### POST /api/auth/refresh - 刷新Token

**Request:**
```typescript
interface RefreshRequest {
  refreshToken: string;
}
```

**Response:**
```typescript
interface RefreshResponse {
  token: string;
  refreshToken: string;
}
```

### 3.2 简历模块 (Resume)

#### GET /api/resumes - 获取简历列表

**Query Parameters:**
```typescript
interface ListResumesQuery {
  page?: number;      // 默认1
  limit?: number;     // 默认20，最大100
  sortBy?: 'updatedAt' | 'createdAt' | 'title';
  order?: 'asc' | 'desc';
}
```

**Response:**
```typescript
interface ListResumesResponse {
  items: ResumeSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ResumeSummary {
  id: number;
  title: string;
  template: TemplateKey;
  updatedAt: string;
  createdAt: string;
}
```

#### GET /api/resumes/:id - 获取单个简历

**Response:**
```typescript
interface GetResumeResponse {
  id: number;
  title: string;
  template: TemplateKey;
  data: ResumeData;
  meta?: ResumeMeta;
  updatedAt: string;
  createdAt: string;
}

interface ResumeMeta {
  version: number;
  lastExportedAt?: string;
  exportCount?: number;
}
```

#### POST /api/resumes - 创建简历

**Request:**
```typescript
interface CreateResumeRequest {
  title: string;           // 1-100字符
  template?: TemplateKey;  // 默认模板
  data: ResumeData;
}
```

**Response:** `GetResumeResponse`

#### PUT /api/resumes/:id - 更新简历

**Request:**
```typescript
interface UpdateResumeRequest {
  title?: string;
  template?: TemplateKey;
  data?: ResumeData;
}
```

**Response:** `GetResumeResponse`

**注意:** 支持部分更新，只更新提供的字段

#### DELETE /api/resumes/:id - 删除简历

**Response:** `204 No Content`

### 3.3 PDF导出模块 (PDF)

#### POST /api/pdf/export - 导出PDF

**Request:**
```typescript
interface ExportPDFRequest {
  resumeId: number;
  template?: TemplateKey;  // 覆盖默认模板
  options?: PDFOptions;
}

interface PDFOptions {
  format?: 'A4' | 'Letter';
  margin?: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  scale?: number;  // 0.1-2.0，默认1.0
}
```

**Response:**
```typescript
interface ExportPDFResponse {
  downloadUrl: string;     // 临时下载链接（有效期1小时）
  expiresAt: string;       // 过期时间
  fileName: string;
  fileSize: number;
}
```

**错误代码:**
- `RESUME_NOT_FOUND`: 简历不存在
- `TEMPLATE_INVALID`: 模板不存在
- `EXPORT_FAILED`: 导出失败

## 4. 数据类型定义

### 4.1 共享类型 (Shared Types)

这些类型应在前后端共享，确保一致性：

```typescript
// common/types/resume.ts

export type TemplateKey =
  | 'ClassicProfessional'
  | 'ChineseSocial'
  | 'TopjianliMinimalist'
  | 'TopjianliShanghai'
  | 'TopjianliCreative'
  | 'GreenSimple'
  | 'BorderedClean'
  | 'RedModern'
  | 'ChineseProfessional'
  | 'TealEnergetic'
  | 'RedClassic';

export interface Basics {
  name: string;
  label?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  summary?: string;
}

export interface WorkItem {
  id?: string;           // 前端生成，用于React key
  company: string;
  position?: string;
  location?: string;
  startDate?: string;    // ISO 8601格式：YYYY-MM
  endDate?: string;      // ISO 8601格式：YYYY-MM
  description?: string;
  highlights?: string[];
}

export interface EducationItem {
  id?: string;
  school: string;
  area?: string;
  degree?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  courses?: string[];
}

export interface Skill {
  id?: string;
  name: string;
  level?: string;
  keywords?: string[];
}

export interface Project {
  id?: string;
  name: string;
  description?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  technologies?: string[];
}

export interface ResumeData {
  basics: Basics;
  work: WorkItem[];
  education: EducationItem[];
  skills: Skill[];
  projects: Project[];
}
```

### 4.2 前端专用类型

```typescript
// 前端状态管理类型

export interface AppState {
  user: User | null;
  resumes: ResumeSummary[];
  currentResume: Resume | null;
  ui: UIState;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
}

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
}
```

### 4.3 后端专用类型

```typescript
// 后端数据库模型类型

export interface UserModel {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeModel {
  id: number;
  userId: string;
  title: string;
  template: TemplateKey;
  data: ResumeData;
  meta: ResumeMeta;
  createdAt: Date;
  updatedAt: Date;
}
```

## 5. 数据流架构

### 5.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Components │  │    Store    │  │       API Client        │  │
│  │  - Forms    │  │  (Zustand)  │  │    (Axios + TanStack    │  │
│  │  - Preview  │  │             │  │        Query)           │  │
│  │  - Editor   │  └─────────────┘  └─────────────────────────┘  │
│  └─────────────┘           │                    │                │
│           │                │                    │                │
│           └────────────────┴────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST + JSON
                              │
┌─────────────────────────────────────────────────────────────────┐
│                        Backend (Express)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Routes    │  │ Controllers │  │        Services         │  │
│  │  - Auth     │  │             │  │  - AuthService          │  │
│  │  - Resume   │  │  (Biz Logic)│  │  - ResumeService        │  │
│  │  - PDF      │  │             │  │  - PDFService           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│           │              │                    │                 │
│  ┌────────┴────────┐     │         ┌─────────┴─────────┐        │
│  │   Middleware    │     │         │                   │        │
│  │ - Auth          │     │    ┌────┴────┐         ┌────┴───┐    │
│  │ - Validation    │     │    │  Cache  │         │  DB    │    │
│  │ - Rate Limit    │     │    │(Redis)  │         │(SQLite)│    │
│  └─────────────────┘     │    └─────────┘         └────────┘    │
│                          │                                       │
└──────────────────────────┴───────────────────────────────────────┘
```

### 5.2 状态管理流

```
用户操作 → Action → Store更新 → 组件重渲染 → API调用 → Store更新
                ↓                                      ↓
           乐观更新                               服务器确认
```

### 5.3 数据同步策略

1. **乐观更新**: 表单修改立即更新本地状态，异步同步到服务器
2. **自动保存**: 使用防抖（debounce）实现自动保存，间隔2秒
3. **冲突处理**: 基于时间戳的乐观锁，检测到冲突时提示用户
4. **离线支持**: 使用本地存储作为缓存，恢复网络后自动同步

## 6. 错误处理规范

### 6.1 前端错误处理

```typescript
// API错误分类
enum ErrorCategory {
  NETWORK,      // 网络错误
  AUTH,         // 认证错误（401/403）
  VALIDATION,   // 验证错误（400）
  NOT_FOUND,    // 资源不存在（404）
  SERVER,       // 服务器错误（500）
  UNKNOWN       // 未知错误
}

// 统一错误处理器
interface ErrorHandler {
  handle(error: ApiError): void;
}
```

### 6.2 错误处理策略

| 错误类型 | 前端行为 |
|----------|----------|
| 401 Unauthorized | 自动跳转到登录页，清除本地token |
| 403 Forbidden | 显示权限不足提示 |
| 404 Not Found | 显示404页面 |
| 422 Validation | 在表单字段显示错误信息 |
| 500 Server Error | 显示通用错误提示，提供重试按钮 |

## 7. 性能优化规范

### 7.1 前端优化

1. **数据获取**: 使用TanStack Query进行缓存和去重
2. **懒加载**: 路由级别和组件级别懒加载
3. **虚拟滚动**: 简历列表使用虚拟滚动（条目>50）

### 7.2 后端优化

1. **响应缓存**: GET请求默认缓存5分钟
2. **数据库索引**: 按userId和updatedAt建立复合索引
3. **PDF生成**: 使用队列异步处理，返回临时URL

## 8. 安全规范

### 8.1 输入验证

- 所有输入必须经过验证
- 使用zod/schema进行运行时类型检查
- 防止XSS：输出时进行HTML转义

### 8.2 认证安全

- Token存储在httpOnly cookie（生产环境）
- 支持CSRF防护
- 密码使用bcrypt加密

### 8.3 API限流

- 认证端点：5次/分钟
- PDF导出：10次/小时
- 其他端点：100次/分钟

## 9. 版本控制

API版本通过URL前缀管理：
- `/api/v1/` - 当前版本
- `/api/v2/` - 未来版本（向后兼容）

## 10. 文档维护

本文档应与代码同步更新：
- API变更时更新本文档
- 类型定义变更时同步到共享类型文件
- 重大变更需团队评审

---

**最后更新**: 2026-03-30
**维护者**: fullstack-lead
**版本**: 1.0.0