<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">课务管理</div></template>
      <el-tabs type="border-card" v-model="activeTab">
        <el-tab-pane label="开课目录查看" name="catalog">
          <el-input v-model="catalogSearch" placeholder="搜索课程..." style="width: 300px; margin-bottom: 12px;" clearable />
          <el-table :data="filteredCatalog" stripe size="small">
            <el-table-column prop="code" label="课程编号" width="120" />
            <el-table-column prop="name" label="课程名称" min-width="200" />
            <el-table-column prop="teacher" label="教师" width="100" />
            <el-table-column prop="credits" label="学分" width="70" />
            <el-table-column prop="hours" label="课时" width="70" />
            <el-table-column prop="semester" label="开课学期" width="140" />
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="网上选课管理" name="select">
          <el-alert title="选课开放时间: 2026年6月15日-6月25日" type="success" :closable="false" style="margin-bottom: 12px;" />
          <el-table :data="availableCourses" stripe size="small">
            <el-table-column type="selection" width="50" />
            <el-table-column prop="name" label="课程名称" min-width="180" />
            <el-table-column prop="teacher" label="教师" width="100" />
            <el-table-column prop="credits" label="学分" width="70" />
            <el-table-column prop="capacity" label="容量" width="80" />
            <el-table-column prop="enrolled" label="已选" width="70" />
            <el-table-column label="操作" width="100"><template #default><el-button type="primary" size="small">选课</el-button></template></el-table-column>
          </el-table>
          <el-button type="primary" style="margin-top: 12px;">提交选课</el-button>
        </el-tab-pane>

        <el-tab-pane label="选课结果查看" name="result">
          <el-table :data="selectedCourses" stripe size="small">
            <el-table-column prop="name" label="课程名称" min-width="180" />
            <el-table-column prop="teacher" label="教师" width="100" />
            <el-table-column prop="credits" label="学分" width="70" />
            <el-table-column prop="time" label="上课时间" width="160" />
            <el-table-column prop="location" label="地点" width="140" />
            <el-table-column label="状态" width="100"><template #default><el-tag type="success" size="small">已选</el-tag></template></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="学期课表查看" name="semester-schedule">
          <el-table :data="semesterSchedule" stripe size="small">
            <el-table-column prop="course" label="课程名称" min-width="160" />
            <el-table-column prop="class" label="班级" min-width="140" />
            <el-table-column prop="credits" label="学分" width="70" />
            <el-table-column prop="teacher" label="教师" width="100" />
            <el-table-column prop="time" label="时间" width="140" />
            <el-table-column prop="location" label="地点" width="120" />
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="本周课表查看" name="week-schedule">
          <el-calendar>
            <template #date-cell="{ data }">
              <div class="cal-day">
                {{ data.day.split('-').pop() }}
                <div v-if="weekScheduleMap[data.day]" class="cal-course">{{ weekScheduleMap[data.day] }}</div>
              </div>
            </template>
          </el-calendar>
        </el-tab-pane>

        <el-tab-pane label="课程成绩查询" name="grade">
          <el-table :data="grades" stripe size="small">
            <el-table-column prop="course" label="课程名称" min-width="180" />
            <el-table-column prop="semester" label="学期" width="160" />
            <el-table-column prop="credits" label="学分" width="70" />
            <el-table-column prop="grade" label="成绩" width="80">
              <template #default="{ row }"><span :style="{ color: row.grade >= 90 ? '#67c23a' : row.grade >= 80 ? '#409eff' : '#303133', fontWeight: '600' }">{{ row.grade }}</span></template>
            </el-table-column>
            <el-table-column label="绩点" width="70"><template #default="{ row }">{{ gpa(row.grade) }}</template></el-table-column>
          </el-table>
          <div style="margin-top: 12px; text-align: right; font-weight: 600;">平均绩点: 3.6</div>
        </el-tab-pane>

        <el-tab-pane label="调停补课查看" name="adjust">
          <el-table :data="adjustments" stripe size="small">
            <el-table-column prop="course" label="课程名称" min-width="160" />
            <el-table-column prop="type" label="类型" width="100"><template #default="{ row }"><el-tag :type="row.type==='调课'?'warning':'info'" size="small">{{ row.type }}</el-tag></template></el-table-column>
            <el-table-column prop="original" label="原安排" min-width="140" />
            <el-table-column prop="adjusted" label="调整后" min-width="140" />
            <el-table-column prop="reason" label="原因" min-width="140" />
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="学期考试查看" name="exam">
          <el-table :data="exams" stripe size="small">
            <el-table-column prop="course" label="课程名称" min-width="160" />
            <el-table-column prop="type" label="考试类型" width="100" />
            <el-table-column prop="date" label="考试时间" width="160" />
            <el-table-column prop="location" label="地点" width="140" />
            <el-table-column prop="seat" label="座位号" width="80" />
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="课程重修管理" name="retake">
          <el-table :data="retakes" stripe size="small">
            <el-table-column prop="course" label="课程名称" min-width="160" />
            <el-table-column prop="originalGrade" label="原成绩" width="80" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status==='审核中'?'warning':'success'" size="small">{{ row.status }}</el-tag></template></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="课程免修管理" name="exempt">
          <el-button type="primary" size="small" style="margin-bottom: 12px;">申请免修</el-button>
          <el-table :data="exempts" stripe size="small">
            <el-table-column prop="course" label="课程名称" min-width="160" />
            <el-table-column prop="reason" label="免修原因" min-width="180" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status==='已通过'?'success':'warning'" size="small">{{ row.status }}</el-tag></template></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="教学评价管理" name="eval">
          <el-table :data="evals" stripe size="small">
            <el-table-column prop="course" label="课程名称" min-width="160" />
            <el-table-column prop="teacher" label="教师" width="100" />
            <el-table-column label="评价状态" width="100"><template #default="{ row }"><el-tag :type="row.done?'success':'danger'" size="small">{{ row.done ? '已评价' : '待评价' }}</el-tag></template></el-table-column>
            <el-table-column label="操作" width="100"><template #default="{ row }"><el-button v-if="!row.done" type="primary" size="small">评价</el-button><el-button v-else text type="primary" size="small">查看</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref('catalog')
const catalogSearch = ref('')

watch(() => route.query.tab, (tab) => { if (tab) activeTab.value = tab }, { immediate: true })

const catalog = ref([
  { code: 'CS601', name: '高级算法设计与分析', teacher: '李教授', credits: 3, hours: 48, semester: '2025-2026-2' },
  { code: 'CS602', name: '机器学习理论', teacher: '王教授', credits: 2, hours: 32, semester: '2025-2026-2' },
  { code: 'EN501', name: '学术英语写作', teacher: '陈教授', credits: 2, hours: 32, semester: '2025-2026-2' },
])
const filteredCatalog = computed(() => catalogSearch.value ? catalog.value.filter(c => c.name.includes(catalogSearch.value) || c.code.includes(catalogSearch.value)) : catalog.value)

const availableCourses = ref([{ name: '自然语言处理', teacher: '周教授', credits: 2, capacity: 40, enrolled: 32 }])
const selectedCourses = ref([{ name: '高级算法设计与分析', teacher: '李教授', credits: 3, time: '周一 8:00-10:25', location: '教学楼A301' }, { name: '机器学习理论', teacher: '王教授', credits: 2, time: '周二 14:00-16:25', location: '教学楼B205' }, { name: '学术英语写作', teacher: '陈教授', credits: 2, time: '周三 10:00-12:25', location: '外语楼301' }])
const semesterSchedule = ref([{ course: '高级算法设计与分析', class: '2023级计算机硕士班', credits: 3, teacher: '李教授', time: '周一 8:00-10:25', location: '教学楼A301' }, { course: '机器学习理论', class: '2023级计算机硕士班', credits: 2, teacher: '王教授', time: '周二 14:00-16:25', location: '教学楼B205' }])

const weekScheduleMap = { '2026-06-15': '算法课', '2026-06-16': '机器学习', '2026-06-17': '英语写作' }

const grades = ref([{ course: '高级算法设计与分析', semester: '2025-2026-1', credits: 3, grade: 92 }, { course: '机器学习理论', semester: '2025-2026-1', credits: 2, grade: 88 }, { course: '学术英语写作', semester: '2025-2026-1', credits: 2, grade: 85 }])
function gpa(g) { return g >= 90 ? '4.0' : g >= 85 ? '3.7' : g >= 80 ? '3.3' : g >= 75 ? '3.0' : '2.7' }

const adjustments = ref([{ course: '机器学习理论', type: '调课', original: '周二 14:00 A301', adjusted: '周四 14:00 B205', reason: '教师会议冲突' }])
const exams = ref([{ course: '高级算法设计与分析', type: '闭卷考试', date: '2026-07-05 09:00-11:00', location: '教学楼A301', seat: '15' }, { course: '机器学习理论', type: '开卷考试', date: '2026-07-08 14:00-16:00', location: '教学楼B205', seat: '22' }])
const retakes = ref([])
const exempts = ref([])
const evals = ref([{ course: '高级算法设计与分析', teacher: '李教授', done: true }, { course: '机器学习理论', teacher: '王教授', done: false }])
</script>
<style scoped>
.page-section { max-width: 1100px; }
.cal-day { font-size: 12px; text-align: center; }
.cal-course { color: #409eff; font-size: 10px; margin-top: 2px; }
</style>
