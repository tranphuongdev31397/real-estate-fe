<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="transparent" size="lg"> {{ triggerTitle }} </Button>
    </DialogTrigger>
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
              <TabsTrigger class="flex-1" value="newAccount">New account</TabsTrigger>
            </TabsList>
            <div class="p-4">
              <TabsContent value="signIn">Make changes to your account here.</TabsContent>
              <TabsContent value="newAccount">Change your password here.</TabsContent>
            </div>
          </Tabs>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
export interface AuthModal {
  triggerTitle: string
}

withDefaults(defineProps<AuthModal>(), {
  triggerTitle: 'Add Listing'
})
</script>
