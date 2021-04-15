<template>
  <main class="contact-hero">
    <div class="container">
      <div class="contact-hero__content">
        <h1 class="heading-1">
          Want to work together?<br>
          Send me a message.
        </h1>

        <form class="contact-form">
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

          <div class="form-field">
            <button class="link">
              Get in touch
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'no-page-spacing',

  data () {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
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
</style>
