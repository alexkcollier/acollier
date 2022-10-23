<template>
  <main class="contact-hero">
    <Head>
      <Title>{{ $t('contact.metaTitle') }}</Title>
    </Head>

    <div class="container">
      <Transition
        name="fade"
        mode="out-in"
      >
        <template v-if="isSuccess">
          <div
            key="thank-you"
            role="status"
            aria-live="polite"
          >
            <h1 class="heading-1">
              {{ $t('contact.thankYouHeading') }}
            </h1>

            <p class="thank-you-text">
              {{ $t('contact.thankYouMessage') }} <br>
              {{ $t('contact.thankYouMessageLine2') }}
            </p>
          </div>
        </template>

        <template v-else>
          <div key="form">
            <h1 class="heading-1">
              {{ $t('contact.mainHeading') }} <br>
              {{ $t('contact.mainHeadingLine2') }}
            </h1>

            <form
              class="contact-form"
              aria-errormessage="form-error"
              @submit.prevent="handleSubmit"
            >
              <!-- name -->
              <div class="form-field">
                <label for="name">
                  {{ $t('contact.contactFormNameLabel') }}
                  <input
                    id="name"
                    v-model="form.name"
                    name="Name"
                    class="input"
                    type="text"
                    required
                  >
                </label>
              </div>

              <!-- filter submissions -->
              <input
                v-model="form.honeypot"
                type="text"
                name="a_password"
                style="display: none !important;"
                tabindex="-1"
                autocomplete="off"
              >

              <!-- email address -->
              <div class="form-field">
                <label for="email">
                  {{ $t('contact.contactFormEmailLabel') }}
                  <input
                    id="email"
                    v-model="form.email"
                    name="Email"
                    class="input"
                    type="email"
                    required
                  >
                </label>
              </div>

              <!-- message -->
              <div class="form-field">
                <label for="message">
                  {{ $t('contact.contactFormMessageLabel') }}
                  <textarea
                    id="message"
                    v-model="form.message"
                    name="Message"
                    rows="4"
                    class="input"
                    required
                  />
                </label>
              </div>

              <!-- submit -->
              <div class="form-field">
                <button :class="['submit-button link link--arrow', { 'is-loading': isSending }]">
                  {{ $t('common.contact') }}
                </button>
              </div>

              <!-- error message -->
              <Transition name="fade">
                <div
                  v-if="mailError"
                  id="form-error"
                  class="form-field"
                  role="alert"
                  aria-live="assertive"
                >
                  {{ $t('contact.contactFormErrorMessage') }} <a
                    href="https://www.linkedin.com/in/alexkcollier/"
                    class="link link--arrow"
                    target="_blank"
                    rel="noopener nofollow"
                  >LinkedIn.</a>
                </div>
              </Transition>
            </form>
          </div>
        </template>
      </Transition>
    </div>
  </main>
</template>

<script>
definePageMeta({
  layout: 'no-page-spacing',
});

export default {
  data () {
    return {
      mailError: false,
      isSuccess: false,
      isSending: false,
      form: {
        name: '',
        email: '',
        honeypot: '',
        message: '',
      },
    };
  },

  methods: {
    resetForm () {
      Object.keys(this.form).forEach((key) => { this.form[key] = ''; });
    },

    handleSuccess () {
      this.resetForm();
      this.isSuccess = true;
    },

    async handleSubmit () {
      if (this.form.honeypot !== '') {
        return this.handleSuccess();
      };

      if (this.mailError) {
        this.mailError = false;
      };

      this.isSending = true;

      const res = await fetch('/.netlify/functions/mail', {
        method: 'post',
        body: JSON.stringify(this.form),
      });

      this.isSending = false;

      if (res.ok) {
        return this.handleSuccess();
      }

      this.mailError = true;
    },
  },
};
</script>

<style lang="scss">
@use 'sass:math';
@use '~/assets/styles/utils/breakpoints' as bp;

.contact-hero {
  --gradient-color: transparent;
  --bg-x: right;
  --hero-y-padding: 4rem;

  align-items: center;
  //TODO: #28 load separate image on mobile
  display: flex;
  min-height: 100%;
  padding: var(--hero-y-padding) var(--page-side-padding);
  text-shadow: 1px 2px 20px rgba(black, 0.75), 0 0 1px rgba(black, 0.5);

  @include bp.below('lg') {
    // when the text is over my face, I need to increase contrast significantly
    --gradient-color: rgba(0, 0, 0, 0.5);
    --bg-x: 90%;
  }
/* stylelint-disable  */
/* something's weird with vue3 tooling */
}
/* stylelint-enable */

.contact-form {
  @include bp.above('md') {
    max-width: math.div(5, 12) * 100%;
  }

  @include bp.below('sm') {
    font-weight: 700;
    text-shadow: 1px 2px 20px rgba(black, 0.75), 0 0 1px rgba(black, 0.5);
  }
/* stylelint-disable */
}
/* stylelint-enable */

.thank-you-text {
  font-size: 1.5rem;
}
</style>
