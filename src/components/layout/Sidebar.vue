<template>
  <div class="sidebar-wrapper">

    <!-- Logo -->
    <div class="logo-area">
      <div class="logo-icon">
        <el-icon :size="22" color="#fff"><School /></el-icon>
      </div>
      <span v-show="!isCollapse" class="logo-text">研究生管理系统</span>
    </div>

    <!-- Menu -->
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="transparent"
      text-color="rgba(255,255,255,0.7)"
      active-text-color="#fff"
      router
      class="sidebar-menu"
    >
      <el-menu-item index="/home">
        <template #title><span class="menu-title">个人学业中心</span></template>
        <el-icon><HomeFilled /></el-icon>
      </el-menu-item>

      <el-menu-item index="/personal">
        <el-icon><User /></el-icon>
        <template #title><span class="menu-title">个人</span></template>
      </el-menu-item>

      <el-menu-item index="/research-work">
        <el-icon><Stamp /></el-icon>
        <template #title><span class="menu-title">研工</span></template>
      </el-menu-item>

      <el-menu-item index="/mentorship">
        <el-icon><Connection /></el-icon>
        <template #title><span class="menu-title">导学</span></template>
      </el-menu-item>

      <el-menu-item index="/cultivation">
        <el-icon><Reading /></el-icon>
        <template #title><span class="menu-title">培养</span></template>
      </el-menu-item>

      <el-menu-item index="/research">
        <el-icon><DataAnalysis /></el-icon>
        <template #title><span class="menu-title">科研</span></template>
      </el-menu-item>

      <el-menu-item index="/degree">
        <el-icon><Trophy /></el-icon>
        <template #title><span class="menu-title">学位</span></template>
      </el-menu-item>

      <el-menu-item v-if="userStore.isGraduated" index="/graduated">
        <el-icon><Medal /></el-icon>
        <template #title><span class="menu-title">已毕业</span></template>
      </el-menu-item>
    </el-menu>

    <!-- Footer -->
    <div v-show="!isCollapse" class="sidebar-footer">
      <span class="version-tag">v1.0</span>
      <span class="school-tag">重庆邮电大学</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { School } from '@element-plus/icons-vue'

const props = defineProps({ isCollapse: Boolean })
defineEmits(['toggle'])

const route = useRoute()
const userStore = useUserStore()

const activeMenu = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  return '/' + (segs[0] || 'home')
})
</script>

<style scoped>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #0d2a6b 0%, #153D97 50%, #108B96 100%);
  position: relative;
  overflow: hidden;
}

/* ===== Logo Area ===== */
.logo-area {
  display: flex;
  align-items: center;
  padding: 16px 14px;
  gap: 10px;
  height: 60px;
  border-bottom: 1px solid rgba(255,255,255,.1);
  z-index: 1;
  position: relative;
}

.logo-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255,255,255,.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.logo-text {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.03em;
}

/* ===== Menu ===== */
.sidebar-menu {
  border-right: none;
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
  background: transparent !important;
  position: relative;
  z-index: 1;
}

.sidebar-menu .el-menu-item {
  margin: 3px 10px !important;
  border-radius: 10px !important;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.07s cubic-bezier(.4,0,.2,1);
  position: relative;
  overflow: hidden;
}

.sidebar-menu .el-menu-item:hover {
  background: rgba(255,255,255,.1) !important;
  color: #fff !important;
}

.sidebar-menu .el-menu-item.is-active {
  background: rgba(16,139,150,.3) !important;
  color: #fff !important;
  font-weight: 600;
}

.sidebar-menu .el-menu-item.is-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: #D2F4F7;
}

.sidebar-menu .el-icon { font-size: 18px; }
.menu-title { margin-left: 4px; }

/* collapse mode */
.sidebar-menu.el-menu--collapse {
  width: 56px;
}
.sidebar-menu.el-menu--collapse .el-menu-item {
  justify-content: center;
  margin: 3px 8px !important;
}
.sidebar-menu.el-menu--collapse .el-icon {
  margin: 0;
  font-size: 20px;
}

/* ===== Footer ===== */
.sidebar-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid rgba(255,255,255,.1);
  z-index: 1;
  position: relative;
}

.version-tag {
  font-size: 10px;
  color: rgba(255,255,255,.3);
  background: rgba(255,255,255,.06);
  padding: 2px 8px;
  border-radius: 99px;
}

.school-tag {
  font-size: 10px;
  color: rgba(255,255,255,.35);
  font-weight: 500;
  letter-spacing: 0.04em;
}
</style>
