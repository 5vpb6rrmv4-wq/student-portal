<template>
  <div class="welcome-bar">

    <div class="welcome-left">
      <div class="welcome-greeting">
        <span class="wave">👋</span>
        <span class="greeting-text">欢迎回来，<strong>{{ userStore.name }}</strong></span>
      </div>
      <div class="welcome-sub">
        <el-tag size="small" effect="dark" round>学号 {{ userStore.studentId }}</el-tag>
      </div>
    </div>
    <div class="welcome-right">
      <div class="week-chip">
        <el-icon><Timer /></el-icon>
        <span>本学期第 <strong>{{ userStore.currentWeek }}</strong> 周</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Timer } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<style scoped>
.welcome-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background: linear-gradient(135deg, #0d2a6b 0%, #153D97 50%, #108B96 100%);
  color: #fff;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.welcome-left {
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 1;
}

.welcome-greeting {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wave {
  font-size: 20px;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-10deg); }
}

.greeting-text {
  font-size: 15px;
  font-weight: 400;
}
.greeting-text strong {
  font-weight: 700;
  letter-spacing: .02em;
  color: #fff;
}

.welcome-sub {
  display: flex;
  align-items: center;
}

.welcome-right {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1;
}

.week-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255,255,255,.1);
  border-radius: 20px;
  font-size: 12px;
  color: rgba(255,255,255,.85);
}
.week-chip .el-icon {
  font-size: 14px;
  opacity: .7;
}

.week-chip strong {
  font-weight: 700;
  color: #a3e635;
}
</style>
