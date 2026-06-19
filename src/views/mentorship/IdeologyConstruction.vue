<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">思想建设</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="思想引领案例库">
          <el-input v-model="searchKey" placeholder="搜索案例..." style="width: 300px; margin-bottom: 12px;" clearable />
          <el-table :data="filteredCases" stripe size="default">
            <el-table-column prop="title" label="案例标题" min-width="240" />
            <el-table-column prop="category" label="分类" width="120"><template #default="{ row }"><el-tag size="small">{{ row.category }}</el-tag></template></el-table-column>
            <el-table-column prop="date" label="发布日���" width="120" />
            <el-table-column label="操作" width="100"><template #default><el-button text type="primary" size="small">阅读</el-button></template></el-table-column>
          </el-table>
          <el-pagination style="margin-top: 16px; justify-content: center;" background layout="prev, pager, next" :total="cases.length" :page-size="10" />
        </el-tab-pane>
        <el-tab-pane label="思想建设活动">
          <el-table :data="activities" stripe size="default">
            <el-table-column prop="title" label="活动名称" min-width="200" />
            <el-table-column prop="date" label="活动时间" width="160" />
            <el-table-column prop="location" label="地点" width="160" />
            <el-table-column prop="status" label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status === '已参加' ? 'success' : 'info'" size="small">{{ row.status }}</el-tag></template></el-table-column>
            <el-table-column label="操作" width="100"><template #default><el-button text type="primary" size="small">查看</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchKey = ref('')
const cases = ref([
  { title: '新时代科技工作者的使命担当', category: '理想信念', date: '2026-06-01' },
  { title: '科学家精神的传承与弘扬', category: '价值引领', date: '2026-05-20' },
  { title: '学术道德与科研诚信', category: '道德修养', date: '2026-05-10' },
])
const activities = ref([
  { title: '研究生思政教育专题讲座', date: '2026-06-15 14:00', location: '学术报告厅', status: '已参加' },
  { title: '红色教育基地参观学习', date: '2026-07-01 08:00', location: '革命纪念馆', status: '待参加' },
])

const filteredCases = computed(() => {
  if (!searchKey.value) return cases.value
  return cases.value.filter(c => c.title.includes(searchKey.value) || c.category.includes(searchKey.value))
})
</script>
<style scoped>.page-section { max-width: 1000px; }</style>
