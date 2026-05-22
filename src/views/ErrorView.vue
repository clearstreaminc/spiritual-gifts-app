<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

function goHome() {
    router.replace('/')
}

</script>

<template>
    <main class="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-900">
        <section class="w-full max-w-xl">
            <div class="rounded-2xl border border-red-200 bg-white p-8 shadow dark:border-red-900 dark:bg-slate-800">
                <p class="text-sm font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                    Configuration Error
                </p>

                <h1 class="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Questionnaire Not Found
                </h1>

                <p class="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
                    The configured questionnaire could not be loaded.
                    Please verify the questionnaire configuration
                    and registry entries.
                </p>

                <Button label="Try Again" class="mt-8 w-full" @click="goHome" />
            </div>
        </section>
    </main>
</template>