import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/HomePage.vue'),
    meta: { title: '个人学业中心', icon: 'HomeFilled' },
  },
  // ========== 个人 ==========
  {
    path: '/personal',
    name: 'Personal',
    redirect: '/personal/info',
    meta: { title: '个人', icon: 'User' },
    children: [
      {
        path: 'info',
        name: 'PersonalInfo',
        component: () => import('@/views/personal/PersonalInfo.vue'),
        meta: { title: '个人信息', parent: '个人' },
      },
      {
        path: 'enrollment-docs',
        name: 'EnrollmentDocs',
        component: () => import('@/views/personal/EnrollmentDocs.vue'),
        meta: { title: '入学证件', parent: '个人' },
      },
      {
        path: 'archive-delivery',
        name: 'ArchiveDelivery',
        component: () => import('@/views/personal/ArchiveDelivery.vue'),
        meta: { title: '档案寄达', parent: '个人' },
      },
      {
        path: 'photo-verify',
        name: 'PhotoVerify',
        component: () => import('@/views/personal/PhotoVerify.vue'),
        meta: { title: '照片核对', parent: '个人' },
      },
      {
        path: 'semester-register',
        name: 'SemesterRegister',
        component: () => import('@/views/personal/SemesterRegister.vue'),
        meta: { title: '学期注册', parent: '个人' },
      },
      {
        path: 'complaint',
        name: 'Complaint',
        component: () => import('@/views/personal/Complaint.vue'),
        meta: { title: '投诉建议', parent: '个人' },
      },
    ],
  },
  // ========== 研工 ==========
  {
    path: '/research-work',
    name: 'ResearchWork',
    redirect: '/research-work/scholarship',
    meta: { title: '研工', icon: 'Stamp' },
    children: [
      {
        path: 'scholarship',
        name: 'Scholarship',
        component: () => import('@/views/research-work/Scholarship.vue'),
        meta: { title: '奖助学金', parent: '研工' },
      },
      {
        path: 'daily-management',
        name: 'DailyManagement',
        component: () => import('@/views/research-work/DailyManagement.vue'),
        meta: { title: '日常管理', parent: '研工' },
      },
      {
        path: 'three-assist',
        name: 'ThreeAssist',
        component: () => import('@/views/research-work/ThreeAssist.vue'),
        meta: { title: '三助一辅', parent: '研工' },
      },
      {
        path: 'hardship',
        name: 'Hardship',
        component: () => import('@/views/research-work/HardshipApplication.vue'),
        meta: { title: '困难申请', parent: '研工' },
      },
    ],
  },
  // ========== 导学 ==========
  {
    path: '/mentorship',
    name: 'Mentorship',
    redirect: '/mentorship/team',
    meta: { title: '导学', icon: 'Connection' },
    children: [
      {
        path: 'team',
        name: 'TeamMembers',
        component: () => import('@/views/mentorship/TeamMembers.vue'),
        meta: { title: '导学团队', parent: '导学' },
      },
      {
        path: 'academic-construction',
        name: 'AcademicConstruction',
        component: () => import('@/views/mentorship/AcademicConstruction.vue'),
        meta: { title: '学风建设', parent: '导学' },
      },
      {
        path: 'ideology-construction',
        name: 'IdeologyConstruction',
        component: () => import('@/views/mentorship/IdeologyConstruction.vue'),
        meta: { title: '思想建设', parent: '导学' },
      },
      {
        path: 'culture-construction',
        name: 'CultureConstruction',
        component: () => import('@/views/mentorship/CultureConstruction.vue'),
        meta: { title: '文化建设', parent: '导学' },
      },
      {
        path: 'advisor-change',
        name: 'AdvisorChange',
        component: () => import('@/views/mentorship/AdvisorChange.vue'),
        meta: { title: '导师变更', parent: '导学' },
      },
    ],
  },
  // ========== 培养 ==========
  {
    path: '/cultivation',
    name: 'Cultivation',
    redirect: '/cultivation/cultivation-management',
    meta: { title: '培养', icon: 'Reading' },
    children: [
      {
        path: 'cultivation-management',
        name: 'CultivationManagement',
        component: () => import('@/views/cultivation/CultivationManagement.vue'),
        meta: { title: '培养管理', parent: '培养' },
      },
      {
        path: 'course-management',
        name: 'CourseManagement',
        component: () => import('@/views/cultivation/CourseManagement.vue'),
        meta: { title: '课务管理', parent: '培养' },
      },
      {
        path: 'exam-level',
        name: 'ExamLevel',
        component: () => import('@/views/cultivation/ExamLevelManagement.vue'),
        meta: { title: '考级管理', parent: '培养' },
      },
      {
        path: 'enrollment-change',
        name: 'EnrollmentChange',
        component: () => import('@/views/cultivation/EnrollmentChange.vue'),
        meta: { title: '学籍异动', parent: '培养' },
      },
    ],
  },
  // ========== 科研 ==========
  {
    path: '/research',
    name: 'Research',
    redirect: '/research/achievements',
    meta: { title: '科研', icon: 'DataAnalysis' },
    children: [
      {
        path: 'achievements',
        name: 'AcademicAchievements',
        component: () => import('@/views/research/AcademicAchievements.vue'),
        meta: { title: '学术成果', parent: '科研' },
      },
      {
        path: 'jiebang',
        name: 'JiebangProject',
        component: () => import('@/views/research/JiebangProject.vue'),
        meta: { title: '揭榜挂帅', parent: '科研' },
      },
    ],
  },
  // ========== 学位 ==========
  {
    path: '/degree',
    name: 'Degree',
    redirect: '/degree/dissertation',
    meta: { title: '学位', icon: 'Trophy' },
    children: [
      {
        path: 'dissertation',
        name: 'Dissertation',
        component: () => import('@/views/degree/Dissertation.vue'),
        meta: { title: '学位论文', parent: '学位' },
      },
      {
        path: 'degree-info',
        name: 'DegreeInfo',
        component: () => import('@/views/degree/DegreeInfo.vue'),
        meta: { title: '学位', parent: '学位' },
      },
    ],
  },
  // ========== 已毕业学生 ==========
  {
    path: '/graduated',
    name: 'Graduated',
    redirect: '/graduated/home',
    meta: { title: '已毕业', icon: 'Medal' },
    children: [
      {
        path: 'home',
        name: 'GraduatedHome',
        component: () => import('@/views/graduated/GraduatedHome.vue'),
        meta: { title: '已毕业学生页面', parent: '已毕业' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
