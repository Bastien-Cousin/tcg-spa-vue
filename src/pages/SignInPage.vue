<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useApi } from '@/composables/useApi'
import { ROUTES } from '@/router'
import { useAuthStore } from '@/store/auth.store'

const email = ref('')
const password = ref('')
const loading = ref(false)

const message = useMessage()
const api = useApi()
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  if (!email.value || !password.value) {
    message.warning('Email et mot de passe requis')
    return
  }

  loading.value = true
  try {
    const { token, user } = await api.signIn({
      email: email.value,
      password: password.value,
    })
    authStore.login(token, user)
    message.success('Connexion réussie')
    await router.push(ROUTES.HOME)
  } catch (err) {
    message.error((err as Error).message || 'Échec de la connexion')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <NSpace id="space" vertical align="center" justify="center">
    <NForm id="form" @submit.prevent="handleLogin">
      <h1>Connexion</h1>
      <NFormItem label="Email" required>
        <NInput
          id="email"
          v-model:value="email"
          placeholder="votre@email.com"
        />
      </NFormItem>
      <NFormItem label="Mot de passe" required>
        <NInput
          id="password"
          v-model:value="password"
          type="password"
          show-password-on="click"
          placeholder="**********"
        />
      </NFormItem>
      <NButton id="button" type="primary" attr-type="submit" :loading="loading"
        >Se connecter</NButton
      >
      <p id="redirection">
        Pas encore de compte ?
        <RouterLink :to="ROUTES.SIGNUP">S'inscrire</RouterLink>
      </p>
    </NForm>
  </NSpace>
</template>

<style scoped>
#space {
  min-height: 100vh;
}

#form {
  width: 400px;
  border: solid 1px #efeff5;
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
}

#email {
  margin-bottom: 15px;
}

#button {
  width: 100%;
}

#redirection {
  text-align: center;
}
</style>
