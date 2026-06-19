<template>
  <div class="home-page">
    <!-- Row 1: 本学期课表 — 独占整行，2位教师 -->
    <div v-if="userStore.schedule.length > 0" class="home-card">
      <div class="card-header">
        <span class="card-title"><span class="title-dot"></span>本学期课表</span>
      </div>
      <div class="card-body">
        <el-table :data="userStore.schedule" stripe size="small" class="schedule-table">
          <el-table-column prop="course" label="课程名称" min-width="120" />
          <el-table-column prop="class" label="班级名称" min-width="120" />
          <el-table-column prop="hours" label="课时" width="48" align="center" />
          <el-table-column prop="credits" label="学分" width="48" align="center" />
          <el-table-column label="教师" min-width="85">
            <template #default="{ row }">
              <span class="teacher-names">{{ row.teachers.join('、') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" width="120" />
          <el-table-column prop="location" label="地点" width="110" />
          <el-table-column label="操作" width="180" fixed="right" align="center">
            <template #default="{ row }">
              <span class="btn-inline">
                <el-button size="small" :type="row.gradeOpen?'primary':'info'" :disabled="!row.gradeOpen" round @click="goTo('/cultivation/course-management?tab=grade')">成绩</el-button>
                <el-button size="small" :type="row.examOpen?'primary':'info'" :disabled="!row.examOpen" round @click="goTo('/cultivation/course-management?tab=exam')">考试</el-button>
                <el-button size="small" :type="row.evalOpen?'primary':'info'" :disabled="!row.evalOpen" round @click="goTo('/cultivation/course-management?tab=eval')">评价</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- Row 2: 课程进度(窄) + 科研进度(宽) + 揭榜挂帅(宽) 三列 -->
    <div class="home-grid-3">
      <!-- 课程进度 — 宽度不变 -->
      <div class="home-card credit-col">
        <div class="card-header"><span class="card-title"><span class="title-dot dot-green"></span>课程进度</span></div>
        <div class="card-body">
          <div class="credit-overview">
            <div class="credit-donut">
              <el-progress type="dashboard" :percentage="creditPercent" :color="creditColors" :stroke-width="12" :width="100">
                <template #default="{ percentage }"><span class="donut-pct">{{ percentage }}%</span></template>
              </el-progress>
              <div class="credit-numbers">
                <div class="num-block done"><span class="num-val">{{ userStore.creditRequirement.completed }}</span><span class="num-label">已修</span></div>
                <div class="num-block remain"><span class="num-val">{{ userStore.creditRequirement.total - userStore.creditRequirement.completed }}</span><span class="num-label">剩余</span></div>
              </div>
            </div>
            <div class="credit-detail">
              <div v-for="cat in userStore.creditRequirement.categories" :key="cat.name" class="credit-bar">
                <div class="bar-header"><span class="bar-label">{{ cat.name }}</span><span class="bar-num" :class="cat.completed>=cat.required?'done':'pending'">{{ cat.completed }}/{{ cat.required }}</span></div>
                <el-progress :percentage="Math.round((cat.completed/cat.required)*100)" :stroke-width="8" :color="cat.completed>=cat.required?'#108B96':'#f4ca91'" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 科研进度 — 两块 + more入口，不显示日期 -->
      <div class="home-card research-col">
        <div class="card-header">
          <span class="card-title"><span class="title-dot dot-purple"></span>科研进度</span>
          <button class="more-btn" @click="goTo('/research/achievements')">more →</button>
        </div>
        <div class="card-body">
          <h4 class="sub-heading">✅ 已完成</h4>
          <div v-if="userStore.researchProgress.completed.length" class="research-list">
            <div v-for="a in userStore.researchProgress.completed" :key="a.name" class="research-row">
              <el-tag size="small" round effect="plain">{{ a.category }}</el-tag>
              <span class="r-name">{{ a.name }}</span>
            </div>
          </div>
          <el-empty v-else description="暂无成果" :image-size="32" />

          <h4 class="sub-heading">🔬 在研项目</h4>
          <div v-if="userStore.researchProgress.ongoing.length" class="research-list">
            <div v-for="p in userStore.researchProgress.ongoing" :key="p.name" class="research-row">
              <span class="r-name">{{ p.name }}</span>
            </div>
          </div>
          <el-empty v-else description="暂无在研项目" :image-size="32" />
        </div>
      </div>

      <!-- 揭榜挂帅 — 宽，去掉类别和日期 -->
      <div class="home-card jiebang-col">
        <div class="card-header">
          <span class="card-title"><span class="title-dot dot-orange"></span>揭榜挂帅</span>
          <button class="more-btn" @click="goTo('/research/jiebang')">more →</button>
        </div>
        <div class="card-body">
          <el-table :data="userStore.jiebangProjects" stripe size="small">
            <el-table-column type="index" label="#" width="44" align="center" />
            <el-table-column prop="title" label="项目名称" show-overflow-tooltip />
            <el-table-column label="操作" width="72" align="center">
              <template #default><el-button text type="primary" size="small">详情</el-button></template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- Row 3: 学业进展 — 纯文字行 -->
    <div class="progress-inline">
      <span class="progress-inline-title">学业进展</span>
      <span class="progress-inline-sep">|</span>
      <template v-for="node in userStore.progressNodes" :key="node.id">
        <span class="progress-word" :class="getNodeClass(node)" @click="goTo(node.route)">{{ node.name }}</span>
        <span v-if="node.id < userStore.progressNodes.length" class="progress-arrow">→</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const creditPercent = computed(() => {
  const { total, completed } = userStore.creditRequirement
  return Math.round((completed / total) * 100)
})

const creditColors = computed(() => {
  const pct = creditPercent.value
  if (pct >= 80) return [{ color: '#108B96', percentage: 100 }]
  if (pct >= 50) return [{ color: '#f4ca91', percentage: 100 }]
  return [{ color: '#ef4444', percentage: 100 }]
})

function getNodeClass(node) {
  if (node.status === 'always') return 'always-active'
  if (node.status === 'done') return 'done'
  if (node.status === 'active') return 'active'
  return 'pending'
}

function goTo(path) { router.push(path) }
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1600px;
}

/* ========== Uneven 3-col grid ========== */
.home-grid-3 {
  display: grid;
  grid-template-columns: 280px 1fr 1fr;
  gap: 16px;
}
@media (max-width: 1400px) {
  .home-grid-3 { grid-template-columns: 260px 1fr 1fr; }
}
@media (max-width: 1100px) {
  .home-grid-3 { grid-template-columns: 1fr 1fr; }
  .credit-col { grid-column: 1 / -1; }
}
@media (max-width: 768px) {
  .home-grid-3 { grid-template-columns: 1fr; }
}

/* ========== Teacher names ========== */
.teacher-names {
  font-size: 12px;
  line-height: 1.3; color: #334155;
}

/* Inline buttons */
.btn-inline {
  display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;
}
.btn-inline .el-button { margin: 0 !important; padding: 4px 10px !important; }

/* ========== Card ========== */
.home-card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 2px 8px rgba(0,0,0,.04);
  overflow: hidden;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
}
.card-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}
.title-dot {
  width: 10px; height: 10px; border-radius: 50%; background: #153D97;
}
.title-dot.dot-green  { background: #108B96; }
.title-dot.dot-purple { background: #8b5cf6; }
.title-dot.dot-blue   { background: #153D97; }
.title-dot.dot-orange { background: #f4ca91; }
.more-btn {
  background: none; border: none; font-size: 12px; font-weight: 500;
  color: #153D97; cursor: pointer; padding: 4px 10px; border-radius: 6px;
  font-family: inherit;
}
.more-btn:hover { background: #E8EDF5; }
.card-body { padding: 16px 20px; }

/* ========== Credit ========== */
.credit-overview {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.credit-donut { text-align: center; flex-shrink: 0; }

.donut-pct { font-size: 26px; font-weight: 800; color: #0f172a; }
.donut-label { display: block; font-size: 11px; color: #475569; margin-top: 2px; }

.credit-numbers {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}
.num-block {
  padding: 8px 16px;
  border-radius: 10px;
  text-align: center;
  min-width: 72px;
}
.num-block.done { background: #E8EDF5; }
.num-block.remain { background: #fef2f2; }
.num-block.done .num-val { color: #153D97; }
.num-block.remain .num-val { color: #dc2626; }
.num-val { font-size: 20px; font-weight: 700; display: block; }
.num-label { font-size: 10px; color: #475569; }

.credit-detail { flex: 1; }

.credit-bar { margin-bottom: 14px; }
.credit-bar:last-child { margin-bottom: 0; }

.bar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.bar-label { font-size: 12px; color: #64748b; font-weight: 500; }
.bar-num { font-size: 11px; font-weight: 700; }
.bar-num.done { color: #153D97; }
.bar-num.pending { color: #dc2626; }

/* ========== Research ========== */
.sub-heading {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  margin: 14px 0 8px;
  padding-left: 0;
  border-left: none;
  letter-spacing: 0.02em;
}
.sub-heading:first-child { margin-top: 0; }

.research-list { display: flex; flex-direction: column; gap: 6px; }

.research-row {
  display: flex; align-items: center; gap: 8px; padding: 6px 10px;
  background: #f8fafc; border-radius: 8px; font-size: 12px; flex-wrap: wrap;
}
.research-row:hover { background: #f1f5f9; }

.r-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.r-date { color: #475569; font-size: 11px; flex-shrink: 0; }

.link-btn {
  background: none;
  border: none;
  color: #153D97;
  font-size: 12px;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: inherit;
  flex-shrink: 0;
}
.link-btn:hover { background: #E8EDF5; }

/* ========== Progress Flow ========== */
.progress-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding: 4px 0;
}

.progress-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 12px 16px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.08s;
  border: 2px solid transparent;
  min-width: 64px;
  position: relative;
}
.progress-node:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.1); }

.node-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

.node-name { font-size: 12px; }

.progress-node.pending       { background: #f8fafc; color: #64748b; border-color: #e2e8f0; }
.progress-node.pending .node-num { background: #e2e8f0; color: #64748b; }
.progress-node.active        { background: #E8EDF5; color: #153D97; border-color: #93c5fd; box-shadow: 0 2px 10px rgba(21,61,151,.1); }
.progress-node.active .node-num { background: #153D97; color: #fff; }
.progress-node.done          { background: #D2F4F7; color: #0d2a6b; border-color: #67e8f9; box-shadow: 0 2px 10px rgba(16,139,150,.08); }
.progress-node.done .node-num { background: #108B96; color: #fff; }
.progress-node.always-active { background: linear-gradient(135deg, #1e293b, #334155); color: #fff; border-color: #475569; font-weight: 700; box-shadow: 0 2px 12px rgba(15,43,69,.25); }
.progress-node.always-active .node-num { background: rgba(255,255,255,.2); color: #fff; }

/* ========== Inline Progress Row ========== */
.progress-inline {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; background: #fff; border-radius: 10px;
  border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,.03);
  flex-wrap: wrap;
}
.progress-inline-title {
  font-size: 13px; font-weight: 700; color: #0f172a; margin-right: 4px;
}
.progress-inline-sep { color: #e2e8f0; }
.progress-word {
  font-size: 12px; font-weight: 600; cursor: pointer; padding: 2px 6px;
  border-radius: 4px; transition: all 0.06s;
}
.progress-word:hover { background: #f1f5f9; }
.progress-word.always-active { color: #1e293b; background: #f1f5f9; }
.progress-word.active { color: #153D97; }
.progress-word.done { color: #108B96; }
.progress-word.pending { color: #94a3b8; }
.progress-arrow { color: #cbd5e1; font-size: 10px; }

/* ========== Table ========== */
.schedule-table { font-size: 13px; }
</style>
