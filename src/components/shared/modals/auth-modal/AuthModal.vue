<template>
  <Dialog :open="isOpen" @update:open="onOpenChange">
    <DialogContent>
      <DialogHeader>
        <DialogTitle
          class="flex flex-col items-center gap-2 text-2xl text-centernpx shadcn-vue@latest add input"
        >
          <h3>Welcome to SeeR</h3>
          <Logo />
        </DialogTitle>
        <DialogDescription class="my-4">
          <Tabs defaultValue="signIn">
            <TabsList class="w-full">
              <TabsTrigger class="flex-1" value="signIn">Sign in</TabsTrigger>
              <TabsTrigger class="flex-1" value="signUp">Sign up</TabsTrigger>
            </TabsList>
            <div class="p-4">
              <TabsContent value="signIn">
                <SingInForm @onSuccess="(data: any) => onOpenChange(false, data)" />
              </TabsContent>
              <TabsContent value="signUp">
                <SignUpForm @onSuccess="(data: any) => onOpenChange(false, data)" />
              </TabsContent>
            </div>
          </Tabs>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
interface AuthModal {
  isOpen: boolean
}

const emit = defineEmits(['changeOpen'])

withDefaults(defineProps<AuthModal>(), {
  isOpen: false
})

const onOpenChange = (value: boolean, data?: any) => {
  emit('changeOpen', value, data)
}
</script>
