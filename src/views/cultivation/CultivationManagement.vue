<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">培养管理</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="培养方案查询">
          <el-descriptions :column="2" border size="default">
            <el-descriptions-item label="专业">计算机科学与技术</el-descriptions-item>
            <el-descriptions-item label="培养层次">硕士研究生</el-descriptions-item>
            <el-descriptions-item label="学习形式">全日制</el-descriptions-item>
            <el-descriptions-item label="学制">3年</el-descriptions-item>
            <el-descriptions-item label="总学分要求">32学分</el-descriptions-item>
            <el-descriptions-item label="学位课学分">14学分</el-descriptions-item>
            <el-descriptions-item label="培养方案版本">2023版</el-descriptions-item>
          </el-descriptions>
          <el-button type="primary" style="margin-top: 16px;">下载培养方案PDF</el-button>
        </el-tab-pane>
        <el-tab-pane label="培养计划管理">
          <el-button type="primary" size="small" style="margin-bottom: 12px;">编辑培养计划</el-button>
          <el-table :data="planItems" stripe size="default">
            <el-table-column prop="semester" label="学期" width="160" />
            <el-table-column prop="course" label="课程名称" min-width="200" />
            <el-table-column prop="credits" label="学分" width="80" />
            <el-table-column prop="type" label="课程类别" width="120"><template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template></el-table-column>
            <el-table-column prop="status" label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status === '已完成' ? 'success' : 'info'" size="small">{{ row.status }}</el-tag></template></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="培养计划查询">
          <el-table :data="planItems" stripe size="default">
            <el-table-column prop="semester" label="学期" width="160" />
            <el-table-column prop="course" label="课程名称" min-width="200" />
            <el-table-column prop="credits" label="学分" width="80" />
            <el-table-column prop="grade" label="成绩" width="80" />
            <el-table-column prop="type" label="课程类别" width="120"><template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template></el-table-column>
          </el-table>
          <div style="margin-top: 12px; text-align: right; font-weight: 600;">已修学分: 24 / 要求: 32</div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const planItems = ref([
  { semester: '2023-2024学年第一学期', course: '高级算法设计与分析', credits: 3, type: '学位课', status: '已完成', grade: '92' },
  { semester: '2023-2024学年第一学期', course: '机器学习理论', credits: 2, type: '学位课', status: '已完成', grade: '88' },
  { semester: '2023-2024学年第二学期', course: '学术英语写作', credits: 2, type: '公共课', status: '已完成', grade: '85' },
  { semester: '2024-2025学年第一学期', course: '深度学习方法', credits: 2, type: '选修课', status: '已完成', grade: '90' },
  { semester: '2025-2026学年第二学期', course: '自然语言处理', credits: 2, type: '选修课', status: '进行中', grade: '' },
])
</script>
<style scoped>.page-section { max-width: 1000px; }</style>
