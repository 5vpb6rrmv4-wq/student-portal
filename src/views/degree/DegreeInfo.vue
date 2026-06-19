<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">学位</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="学位申请信息管理">
          <el-button type="primary" size="small" style="margin-bottom: 12px;">发起学位申请</el-button>
          <el-table :data="degreeApps" stripe size="default">
            <el-table-column prop="degreeType" label="申请学位" width="160" />
            <el-table-column prop="applyDate" label="申请日期" width="140" />
            <el-table-column label="状态" width="120"><template #default="{ row }"><el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag></template></el-table-column>
            <el-table-column label="操作" width="120"><template #default><el-button text type="primary" size="small">查看</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="学位授予信息核对">
          <el-descriptions :column="2" border size="default">
            <el-descriptions-item label="姓名">张三</el-descriptions-item>
            <el-descriptions-item label="学号">2023301001</el-descriptions-item>
            <el-descriptions-item label="专业">计算机科学与技术</el-descriptions-item>
            <el-descriptions-item label="授予学位">工学硕士</el-descriptions-item>
            <el-descriptions-item label="入学日期">2023-09-01</el-descriptions-item>
            <el-descriptions-item label="预计毕业">2026-07-01</el-descriptions-item>
          </el-descriptions>
          <el-button type="primary" style="margin-top: 16px;">确认信息无误</el-button>
        </el-tab-pane>

        <el-tab-pane label="毕业证书信息查看">
          <el-empty description="毕业证书尚未生成" :image-size="64" />
        </el-tab-pane>

        <el-tab-pane label="学位证书信息查看">
          <el-empty description="学位证书尚未生成" :image-size="64" />
        </el-tab-pane>

        <el-tab-pane label="就业情况信息登记">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>登记就业信息</el-button>
          <el-table :data="employments" stripe size="default">
            <el-table-column prop="company" label="就业单位" min-width="220" />
            <el-table-column prop="position" label="职位" width="160" />
            <el-table-column prop="type" label="就业类型" width="120"><template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template></el-table-column>
            <el-table-column prop="date" label="登记日期" width="120" />
            <el-table-column label="操作" width="120"><template #default><el-button text type="primary" size="small">编辑</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const degreeApps = ref([{ degreeType: '工学硕士', applyDate: '', status: '未申请' }])
const employments = ref([])
function statusType(s) { return s === '已通过' ? 'success' : s === '审核中' ? 'warning' : 'info' }
</script>
<style scoped>.page-section { max-width: 1000px; }</style>
