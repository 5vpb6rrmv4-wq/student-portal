<template>
  <el-container class="app-container">
    <!-- Sidebar -->
    <el-aside :width="isCollapse ? '56px' : '200px'" class="app-aside">
      <Sidebar :is-collapse="isCollapse" @toggle="toggleSidebar" />
    </el-aside>

    <!-- Main area -->
    <el-container class="main-container">
      <!-- Top nav bar -->
      <el-header height="auto" class="app-header">
        <TopNav :is-collapse="isCollapse" @toggle="toggleSidebar" />
      </el-header>

      <!-- Welcome bar (hidden for graduated students) -->
      <WelcomeBar v-if="!userStore.isGraduated" />

      <!-- Breadcrumb -->
      <div class="breadcrumb-bar">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">
            <el-icon><HomeFilled /></el-icon>
            个人学业中心
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="parentTitle">{{ parentTitle }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentTitle">{{ currentTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- Notification + Todo bar (home page only, not for graduated) -->
      <div v-if="showNotificationBar" class="notification-bar">
        <NotificationPanel />
      </div>

      <!-- Page content -->
      <el-main class="page-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import Sidebar from '@/components/layout/Sidebar.vue'
import TopNav from '@/components/layout/TopNav.vue'
import WelcomeBar from '@/components/layout/WelcomeBar.vue'
import NotificationPanel from '@/components/common/NotificationPanel.vue'

const route = useRoute()
const userStore = useUserStore()
const isCollapse = ref(false)

const currentTitle = computed(() => route.meta?.title || '')
const parentTitle = computed(() => route.meta?.parent || '')

const showNotificationBar = computed(() => {
  return route.path === '/home' && !userStore.isGraduated
})

function toggleSidebar() {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped>
.app-container {
  height: 100vh;
}

.app-aside {
  transition: width 0.1s cubic-bezier(.4,0,.2,1);
  overflow-x: hidden;
  flex-shrink: 0;
  box-shadow: 4px 0 30px rgba(0,0,0,0.12);
  z-index: 10;
}

.main-container {
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.app-header {
  padding: 0;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  z-index: 5;
}

.breadcrumb-bar {
  padding: 10px 24px;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.03);
  flex-shrink: 0;
}

.notification-bar {
  padding: 0 24px;
  background: transparent;
  flex-shrink: 0;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  background: transparent;
}
</style>
