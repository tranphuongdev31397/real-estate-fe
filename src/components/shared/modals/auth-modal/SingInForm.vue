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
          <InputPassword placeholder="Password" v-bind="componentField" />
        </FormControl>
        <FormMessage class="m-0 text-xs" />
      </FormItem>
    </FormField>
    <Button :disabled="form.isSubmitting.value" class="mt-4" type="submit"> Sign in </Button>
  </form>
</template>

<script setup lang="ts">
import { signInSchema } from '@/schemas'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { FormField } from '@/components/ui/form'
import { signIn } from '@/apis/authentication/authenticationServices'
import { toast } from 'vue-sonner'
const formSchema = toTypedSchema(signInSchema)

const form = useForm({
  validationSchema: formSchema
})

const emit = defineEmits(['onSuccess'])

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { password, phoneOrEmail } = values
    const signInData = await signIn({
      password,
      phone: phoneOrEmail,
      email: phoneOrEmail
    })

    emit('onSuccess', signInData)
  } catch (error: any) {
    toast.error(error?.message || '')
  }
})
</script>
