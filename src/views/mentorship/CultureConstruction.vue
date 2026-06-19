<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">文化建设</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="团队文化文件">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Upload /></el-icon>上传文件</el-button>
          <el-table :data="files" stripe size="default">
            <el-table-column prop="name" label="文件名称" min-width="240" />
            <el-table-column prop="type" label="类型" width="100"><template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template></el-table-column>
            <el-table-column prop="uploadDate" label="上传日期" width="120" />
            <el-table-column prop="uploader" label="上传人" width="100" />
            <el-table-column label="操作" width="160">
              <template #default><el-button text type="primary" size="small">下载</el-button><el-button text type="danger" size="small">删除</el-button></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="团队活动策划">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>策划活动</el-button>
          <el-table :data="plans" stripe size="default">
            <el-table-column prop="title" label="活动名称" min-width="200" />
            <el-table-column prop="proposedDate" label="计划时间" width="160" />
            <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status === '已通过' ? 'success' : 'warning'" size="small">{{ row.status }}</el-tag></template></el-table-column>
            <el-table-column prop="proposer" label="提议人" width="100" />
            <el-table-column label="操作" width="120"><template #default><el-button text type="primary" size="small">查看</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
const files = ref([
  { name: '团队文化建设方案.docx', type: '文档', uploadDate: '2026-03-15', uploader: '李教授' },
  { name: '团队活动照片集锦.pdf', type: 'PDF', uploadDate: '2026-04-20', uploader: '张三' },
])
const plans = ref([
  { title: '2026年春季学术交流会', proposedDate: '2026-07-10', status: '审核中', proposer: '张三' },
])
</script>
<style scoped>.page-section { max-width: 1000px; }</style>
