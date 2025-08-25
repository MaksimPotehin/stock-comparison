export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const token = runtimeConfig.public?.gscVerificationContent
  if (!token) return

  useHead({
    meta: [
      {
        name: 'google-site-verification',
        content: token
      }
    ]
  })
})


