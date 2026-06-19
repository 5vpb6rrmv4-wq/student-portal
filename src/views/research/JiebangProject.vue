<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">揭榜挂帅</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="揭榜挂帅任务">
          <div class="toolbar">
            <el-input v-model="taskSearch" placeholder="搜索任务..." style="width: 300px;" clearable />
            <el-select v-model="taskFilter" placeholder="状态筛选" style="width: 140px; margin-left: 12px;" clearable>
              <el-option label="全部" value="" />
              <el-option label="进行中" value="进行中" />
              <el-option label="已完成" value="已完成" />
              <el-option label="招募中" value="招募中" />
            </el-select>
          </div>
          <el-table :data="filteredTasks" stripe size="default" style="margin-top: 12px;">
            <el-table-column prop="title" label="任务名称" min-width="240" />
            <el-table-column prop="category" label="类别" width="120"><template #default="{ row }"><el-tag size="small">{{ row.category }}</el-tag></template></el-table-column>
            <el-table-column prop="publisher" label="发布单位" width="140" />
            <el-table-column prop="publishDate" label="发布日期" width="120" />
            <el-table-column prop="deadline" label="截止日期" width="120" />
            <el-table-column label="状态" width="100">
              <template #default="{ row }"><el-tag :type="row.status==='进行中'?'success':row.status==='招募中'?'warning':'info'" size="small">{{ row.status }}</el-tag></template>
            </el-table-column>
            <el-table-column label="操作" width="120"><template #default><el-button type="primary" size="small">揭榜</el-button></template></el-table-column>
          </el-table>
          <el-pagination style="margin-top: 16px; justify-content: center;" background layout="prev, pager, next" :total="tasks.length" :page-size="10" />
        </el-tab-pane>

        <el-tab-pane label="汇众力闯新途">
          <el-table :data="collaborations" stripe size="default">
            <el-table-column prop="title" label="项目名称" min-width="220" />
            <el-table-column prop="team" label="协作团队" width="160" />
            <el-table-column prop="role" label="本人角色" width="120" />
            <el-table-column prop="startDate" label="开始时间" width="120" />
            <el-table-column label="进度" width="180">
              <template #default="{ row }"><el-progress :percentage="row.progress" :stroke-width="14" /></template>
            </el-table-column>
            <el-table-column label="操作" width="100"><template #default><el-button text type="primary" size="small">查看</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="全程纪实留痕">
          <el-timeline>
            <el-timeline-item
              v-for="(record, idx) in records"
              :key="idx"
              :timestamp="record.date"
              :type="record.type"
              placement="top"
            >
              <el-card shadow="hover" size="small">
                <h4>{{ record.title }}</h4>
                <p style="color: #334155; font-size: 13px;">{{ record.content }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const taskSearch = ref('')
const taskFilter = ref('')

const tasks = ref([
  { title: '智能交通流量预测模型研究', category: '科研攻关', publisher: '科技处', publishDate: '2026-06-01', deadline: '2026-07-01', status: '招募中' },
  { title: '基于联邦学习的隐私保护方案', category: '技术创新', publisher: '信息安全中心', publishDate: '2026-05-15', deadline: '2026-06-30', status: '进行中' },
  { title: '大规模知识图谱构建与应用', category: '科研攻关', publisher: '知识工程实验室', publishDate: '2026-05-01', deadline: '2026-07-15', status: '进行中' },
  { title: '边缘计算资源调度优化', category: '技术创新', publisher: '云计算中心', publishDate: '2026-04-20', deadline: '2026-05-20', status: '已完成' },
  { title: '多模态数据融合分析方法', category: '方法研究', publisher: '数据科学实验室', publishDate: '2026-04-10', deadline: '2026-06-10', status: '进行中' },
])

const filteredTasks = computed(() => {
  let result = tasks.value
  if (taskSearch.value) result = result.filter(t => t.title.includes(taskSearch.value))
  if (taskFilter.value) result = result.filter(t => t.status === taskFilter.value)
  return result
})

const collaborations = ref([
  { title: '多模态数据融合分析', team: '数据科学团队', role: '核心成员', startDate: '2026-04-01', progress: 65 },
])

const records = ref([
  { date: '2026-06-10', title: '中期检查汇报', content: '完成了数据预处理模块和模型初步训练，准确率达到85%', type: 'primary' },
  { date: '2026-05-15', title: '技术方案评审', content: '通过了技术方案评审，确定了联邦学习框架采用FedAvg算法', type: 'success' },
  { date: '2026-04-01', title: '项目启动', content: '正式揭榜"基于联邦学习的隐私保护方案"项目，组建团队', type: 'warning' },
])
</script>
<style scoped>
.page-section { max-width: 1100px; }
.toolbar { display: flex; align-items: center; }
</style>
