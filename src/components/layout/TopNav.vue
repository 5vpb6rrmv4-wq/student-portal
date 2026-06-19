<template>
  <div class="topnav">
    <div class="topnav-left">
      <el-button
        :icon="isCollapse ? 'Expand' : 'Fold'"
        text
        size="large"
        @click="$emit('toggle')"
        class="toggle-btn"
      />
      <div class="quick-nav">
        <button
          v-for="item in navItems"
          :key="item.path"
          class="quick-nav-btn"
          :class="{ active: isActive(item.path) }"
          @click="$router.push(item.path)"
        >
          {{ item.title }}
        </button>
      </div>
    </div>

    <div class="topnav-right">
      <el-dropdown trigger="click" placement="bottom-end">
        <div class="user-chip">
          <el-avatar :size="32" icon="UserFilled" class="user-avatar" />
          <div class="user-meta">
            <span class="username">{{ userStore.name }}</span>
            <span class="user-id">{{ userStore.studentId }}</span>
          </div>
          <el-icon class="chevron"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/personal/info')">
              <el-icon><User /></el-icon>个人信息
            </el-dropdown-item>
            <el-dropdown-item @click="handleChangePassword">
              <el-icon><Lock /></el-icon>修改密码
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">
              <el-icon><SwitchButton /></el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowDown, Lock, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

defineProps({ isCollapse: Boolean })
defineEmits(['toggle'])

const router = useRouter()
const userStore = useUserStore()

const navItems = [
  { path: '/home', title: '个人学业中心' },
  { path: '/personal', title: '个人' },
  { path: '/research-work', title: '研工' },
  { path: '/mentorship', title: '导学' },
  { path: '/cultivation', title: '培养' },
  { path: '/research', title: '科研' },
  { path: '/degree', title: '学位' },
]

function isActive(path) {
  return router.currentRoute.value.path.startsWith(path)
}

function handleChangePassword() {
  ElMessage.info('修改密码功能')
}

function handleLogout() {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    confirmButtonClass: 'el-button--primary',
  }).then(() => {
    ElMessage.success('已退出登录')
  })
}
</script>

<style scoped>
.topnav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 52px;
  background: transparent;
}

.topnav-left {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  flex: 1;
}

.toggle-btn {
  flex-shrink: 0;
  color: #0f172a !important;
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255,255,255,0.5);
}
.toggle-btn:hover {
  background: rgba(255,255,255,0.7) !important;
  color: #000 !important;
}

.quick-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: auto;
  scrollbar-width: none;
}
.quick-nav::-webkit-scrollbar { display: none; }

.quick-nav-btn {
  padding: 6px 16px;
  border: none;
  background: transparent;
  color: #0f172a;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  white-space: nowrap;
  transition: all 0.07s;
  font-family: inherit;
}
.quick-nav-btn:hover {
  background: rgba(255,255,255,0.55);
  color: #000;
}
.quick-nav-btn.active {
  background: rgba(255,255,255,0.7);
  color: #0d2a6b;
  font-weight: 600;
}

.topnav-right { flex-shrink: 0; }

.user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 6px 5px 6px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.07s;
}
.user-chip:hover {
  background: #f8fafc;
}

.user-avatar {
  background: linear-gradient(135deg, #153D97, #108B96) !important;
  flex-shrink: 0;
}

.user-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.username {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.user-id {
  font-size: 11px;
  color: #475569;
}

.chevron {
  color: #475569;
  font-size: 12px;
  margin-left: 2px;
}
</style>
