<template>
  <main class="contact-hero">
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
              Thank you
            </h1>

            <p class="thank-you-text">
              Your message has been sent.<br>
              Expect a reply within 48 hours.
            </p>
          </div>
        </template>

        <template v-else>
          <div key="form">
            <h1 class="heading-1">
              Want to work together?<br>
              Send me a message.
            </h1>

            <form
              class="contact-form"
              aria-errormessage="form-error"
              @submit.prevent="handleSubmit"
            >
              <!-- name -->
              <div class="form-field">
                <label for="name">
                  Name
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
                  Email address
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
                  Message
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
                <button class="link link--arrow">
                  Get in touch
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
                  Something went wrong, and your message could not be sent. Try again, or connect
                  with me on <a
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
export default {
  layout: 'no-page-spacing',

  data () {
    return {
      mailError: false,
      isSuccess: false,
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
      Object.keys(this.form).forEach(key => this.$set(this.form, key, ''));
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

      const res = await fetch('/.netlify/functions/mail', {
        method: 'post',
        body: JSON.stringify(this.form),
      });

      if (res.ok) {
        return this.handleSuccess();
      }

      this.mailError = true;
    },
  },
};
</script>

<style lang="scss">
@use '~/assets/styles/utils/breakpoints' as bp;

.contact-hero {
  --gradient-color: transparent;
  --bg-image: url('~assets/images/acollier.jpg');
  --bg-x: right;

  align-items: center;
  //TODO: #28 load separate image on mobile
  background: linear-gradient(var(--gradient-color), var(--gradient-color)),
    var(--base-background-color) var(--bg-image) var(--bg-x) center / cover no-repeat;
  display: flex;
  height: 100vh;
  padding: var(--page-top-padding) var(--page-side-padding);
  text-shadow: 1px 2px 20px rgba(black, 0.75), 0 0 1px rgba(black, 0.5);

  @include bp.below('lg') {
    // when the text is over my face, I need to increase contrast significantly
    --gradient-color: rgba(0, 0, 0, 0.5);
    --bg-x: 90%;
  }
}

.contact-form {
  @include bp.above('md') {
    max-width: 5/12 * 100%;
  }

  @include bp.below('sm') {
    font-weight: 700;
    text-shadow: 1px 2px 20px rgba(black, 0.75), 0 0 1px rgba(black, 0.5);
  }
}

.thank-you-text {
  font-size: 1.5rem;
}
</style>
