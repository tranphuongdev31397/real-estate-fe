<template>
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Phone number</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Phone" v-bind="componentField" />
        </FormControl>
        <FormMessage class="m-0 text-xs" />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Email" v-bind="componentField" />
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
    <Button :disabled="form.isSubmitting.value" class="mt-4" type="submit"> Sign Up </Button>
  </form>
</template>

<script setup lang="ts">
import { signUpSchema } from '@/schemas'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { FormField } from '@/components/ui/form'
import { signUp } from '@/apis/authentication/authenticationServices'
import { toast } from 'vue-sonner'
import InputPassword from '../../InputPassword.vue'
const formSchema = toTypedSchema(signUpSchema)

const form = useForm({
  validationSchema: formSchema
})

const emit = defineEmits(['onSuccess'])

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const data = await signUp(values)
    toast.success('Sign Up Success')
    form.resetForm()
    emit('onSuccess', data)
  } catch (error: any) {
    console.log(error)
    toast.error(error.message)
  }
})
</script>
