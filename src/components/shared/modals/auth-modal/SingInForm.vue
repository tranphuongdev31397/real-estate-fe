<template>
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="phoneOrEmail">
      <FormItem>
        <FormLabel>Email or Your Phone</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Email/Phone" v-bind="componentField" />
        </FormControl>
        <FormMessage class="m-0 text-xs" />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Password" v-bind="componentField" />
        </FormControl>
        <FormMessage class="m-0 text-xs" />
      </FormItem>
    </FormField>
    <Button class="mt-4" type="submit"> Sign in </Button>
  </form>
</template>

<script setup lang="ts">
import { signInSchema } from '@/schemas'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { FormField } from '@/components/ui/form'
const formSchema = toTypedSchema(signInSchema)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>
