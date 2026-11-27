import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import './index.css'
import App from './App.tsx'

// queryClient 放在组件外创建，避免渲染时反复创建缓存。这也是官方的基础接入方式。
const queryClient = new QueryClient();
dayjs.locale('zh-cn');

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  </ConfigProvider>
);
