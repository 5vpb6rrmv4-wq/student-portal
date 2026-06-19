import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export const useUserStore = defineStore('user', () => {
  // ===== Mock student data =====
  const studentId = ref('2023301001')
  const name = ref('张三')
  const role = ref('student') // 'student' | 'graduated'
  const isGraduated = ref(false)

  // Semester calculation: assume spring semester starts Feb 17, 2026
  const semesterStart = dayjs('2026-02-17')
  const getCurrentWeek = () => {
    const now = dayjs()
    const diff = now.diff(semesterStart, 'week')
    return Math.max(1, Math.min(20, diff + 1))
  }

  const currentWeek = ref(getCurrentWeek())
  const today = ref(dayjs().format('YYYY年MM月DD日'))

  // ===== Notification data =====
  const notifications = ref([
    { id: 1, title: '关于2026年春季学期选课通知', date: '2026-06-10', read: false },
    { id: 2, title: '研究生学术论坛报名通知', date: '2026-06-08', read: false },
    { id: 3, title: '学位论文中期检查安排', date: '2026-06-05', read: true },
    { id: 4, title: '奖助学金评审结果公示', date: '2026-06-01', read: true },
    { id: 5, title: '图书馆数据库培训通知', date: '2026-05-28', read: false },
    { id: 6, title: '研究生暑期社会实践报名', date: '2026-05-25', read: false },
    { id: 7, title: '学术道德规范教育通知', date: '2026-05-20', read: true },
  ])

  const todos = ref([
    { id: 1, title: '学位论文开题报告提交', date: '2026-06-20', status: 'pending' },
    { id: 2, title: '学期注册信息确认', date: '2026-06-18', status: 'pending' },
    { id: 3, title: '奖学金申请材料补充', date: '2026-06-15', status: 'done' },
    { id: 4, title: '学籍照片上传核对', date: '2026-06-12', status: 'done' },
    { id: 5, title: '选课结果确认签字', date: '2026-06-10', status: 'ignored' },
    { id: 6, title: '教学评价填写', date: '2026-06-08', status: 'pending' },
  ])

  // ===== Schedule data =====
  const schedule = ref([
    { course: '高级算法设计与分析', class: '2023级计算机硕士班', hours: 48, credits: 3, teachers: ['李教授', '张副教授'], time: '周一 8:00-10:25', location: '教学楼A301', gradeOpen: true, examOpen: true, evalOpen: false },
    { course: '机器学习理论', class: '2023级计算机硕士班', hours: 32, credits: 2, teachers: ['王教授', '赵讲师'], time: '周二 14:00-16:25', location: '教学楼B205', gradeOpen: true, examOpen: false, evalOpen: true },
    { course: '学术英语写作', class: '2023级硕士英语A班', hours: 32, credits: 2, teachers: ['陈教授', '刘副教授'], time: '周三 10:00-12:25', location: '外语楼301', gradeOpen: false, examOpen: false, evalOpen: false },
  ])

  // ===== Credit progress =====
  const creditRequirement = ref({
    total: 32,
    completed: 24,
    categories: [
      { name: '公共必修课', required: 6, completed: 6 },
      { name: '学科基础课', required: 8, completed: 8 },
      { name: '专业选修课', required: 10, completed: 6 },
      { name: '公共选修课', required: 4, completed: 2 },
      { name: '实践环节', required: 4, completed: 2 },
    ],
  })

  // ===== Research progress =====
  const researchProgress = ref({
    completed: [
      { category: '论文', name: '基于深度学习的图像识别研究' },
      { category: '专利', name: '智能推荐算法优化' },
      { category: '会议', name: '2026年全国人工智能学术会议' },
      { category: '竞赛', name: '全国研究生数学建模竞赛二等奖' },
    ],
    ongoing: [
      { name: '大规模图神经网络训练优化' },
      { name: '多模态数据融合分析方法研究' },
    ],
  })

  // ===== Academic progress nodes =====
  const progressNodes = ref([
    { id: 1, name: '个人', key: 'personal', status: 'always', route: '/personal' },
    { id: 2, name: '研工', key: 'research-work', status: 'always', route: '/research-work' },
    { id: 3, name: '导学', key: 'mentorship', status: 'always', route: '/mentorship' },
    { id: 4, name: '培养', key: 'cultivation', status: 'active', route: '/cultivation' },
    { id: 5, name: '科研', key: 'research', status: 'always', route: '/research' },
    { id: 6, name: '开题', key: 'proposal', status: 'done', route: '/degree/dissertation' },
    { id: 7, name: '中期', key: 'midterm', status: 'active', route: '/degree/dissertation' },
    { id: 8, name: '论文', key: 'thesis', status: 'pending', route: '/degree/dissertation' },
    { id: 9, name: '答辩', key: 'defense', status: 'pending', route: '/degree/dissertation' },
    { id: 10, name: '学位', key: 'degree', status: 'pending', route: '/degree/degree-info' },
    { id: 11, name: '毕业', key: 'graduation', status: 'pending', route: '/degree/degree-info' },
  ])

  // ===== Jiebang projects =====
  const jiebangProjects = ref([
    { id: 1, title: '智能交通流量预测模型研究', category: '科研攻关', publishDate: '2026-06-01' },
    { id: 2, title: '基于联邦学习的隐私保护方案', category: '技术创新', publishDate: '2026-05-15' },
    { id: 3, title: '大规模知识图谱构建与应用', category: '科研攻关', publishDate: '2026-05-01' },
    { id: 4, title: '边缘计算资源调度优化', category: '技术创新', publishDate: '2026-04-20' },
    { id: 5, title: '多模态数据融合分析方法', category: '方法研究', publishDate: '2026-04-10' },
  ])

  // ===== Actions =====
  function markNotifRead(id) {
    const n = notifications.value.find((item) => item.id === id)
    if (n) n.read = true
  }

  function markTodoDone(id) {
    const t = todos.value.find((item) => item.id === id)
    if (t) t.status = 'done'
  }

  function markTodoIgnored(id) {
    const t = todos.value.find((item) => item.id === id)
    if (t) t.status = 'ignored'
  }

  function addTodo(item) {
    todos.value.unshift({
      id: Date.now(),
      ...item,
      status: 'pending',
    })
  }

  return {
    studentId,
    name,
    role,
    isGraduated,
    currentWeek,
    today,
    notifications,
    todos,
    schedule,
    creditRequirement,
    researchProgress,
    progressNodes,
    jiebangProjects,
    markNotifRead,
    markTodoDone,
    markTodoIgnored,
    addTodo,
  }
})
