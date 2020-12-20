<template>
    <b-modal class="text-lg-center" id="modal-parse-confirm" ref="modal-parse-confirm" title="Данные диалплана">

        <div>
            <b-form-group
                    id="parse-extension-group"
                    label="Экстеншен:"
                    label-for="read-attempts"
                    :class="{ 'is-invalid': !$v.form.extension.required }"
            >
                <b-form-input
                        id="parse-extension"
                        v-model="form.extension"
                        maxlength="20"
                        :class="{ 'is-invalid': !$v.form.extension.required }"
                ></b-form-input>
                <b-form-text id="parse-extension-help">
                    <p>Может быть как номером, так и маской на подобии _8XXXXXXXXXX</p>
                </b-form-text>
            </b-form-group>
            <div class="text-danger" v-if="!$v.form.extension.required">Поле должно быть заполнено</div>

            <b-form-group
                    id="parse-context-group"
                    label="Контекст:"
                    label-for="parse-context"
                    :class="{ 'is-invalid': !$v.form.context.required }"
            >
                <b-form-input
                        id="parse-context"
                        v-model="form.context"
                        :class="{ 'is-invalid': !$v.form.context.required }"
                        required
                ></b-form-input>
                <b-form-text id="parse-context-help">
                    <p>Название контекста, в рамках которого будет выполняться скрипт.</p>
                </b-form-text>
            </b-form-group>
            <div class="text-danger" v-if="!$v.form.context.required">Поле должно быть заполнено</div>
        </div>

        <template #modal-footer>
            <div class="w-100">
                <b-button
                        variant="primary"
                        size="md"
                        class="confirm-ok float-right"
                        @click="handleOk"
                >
                    OK
                </b-button>

                <b-button

                        size="md"
                        class="float-right"
                        @click="handleCancel"
                >
                    Отмена
                </b-button>

            </div>
        </template>
    </b-modal>
</template>

<script>
    //import { mapGetters, mapActions } from "vuex";
    import { mapGetters } from "vuex";
    import { required } from 'vuelidate/lib/validators'

    import config from "@/config";
    import files from "../mixins/files";
    import modal from "../mixins/modal";
    export default {
        name: "ParseConfirm",
        mixins: [  files, modal ],
        data () {
            return {
                form: {
                    extension: config.defaults.extension,
                    context: config.defaults.context
                },
            }
        },
        validations: {
            form: {
                extension: {
                    required
                },
                context: {
                    required
                },
            }
        },
        methods: {
            ...mapGetters(["getGraph"]),
            async handleOk() {
                if (this.$v.$invalid) {
                    return false;
                }
                this.$refs['modal-parse-confirm'].hide();
                let formData = new FormData();
                formData.append("scheme", JSON.stringify( this.getGraph().toJSON() ));
                formData.append("extension", this.form.extension);
                formData.append("context", this.form.context);

                try {
                    await fetch(this.$localConfig.parseServiceUrl, {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }).then((response) => {
                        return response.json();
                    }).then((resp) => {
                        console.log(resp);
                        if (resp.result) {
                            this.createFile('asterisk_dialplan', resp.data)
                        } else {
                            this.showModal('Ошибка', resp.message);
                        }
                    });
                } catch (e) {
                    console.error(e);
                    this.showModal('Ошибка', e.name + ": " + e.message);
                }
            },
            handleCancel() {
                this.$refs['modal-parse-confirm'].hide();
            }
        }
    }
</script>

<style scoped>
    .confirm-ok {
        margin-left: 10px;
    }
</style>