<template>
  <article class="repository-info">
    <section class="header flex between center">
      <h2 class="text-overflow">{{ repo.full_name }}</h2>
      <span>
        <i :class="[{ 'golden' : isRepoInFavorites(repo.id) }, 'fas fa-star']"></i>
        {{ repo.stargazers_count }}
      </span>
    </section>

    <section class="main-info">
      <div class="repo-info flex between center">
        <div class="photo">
          <img :src="repo.owner.avatar_url" :alt="repo.owner.login">
        </div>

        <a :href="repo.owner.html_url" target="_blank">
          {{ repo.owner.login }}
          <i class="fab fa-github"></i>
        </a>
      </div>
      <p class="descr">{{ repo.description }}</p>
      <div class="add-btn">
        <button @click.stop="handler(repo.id)">
          <span v-if="isRepoInFavorites(repo.id)">Delete from favorites</span>
          <span v-else>Add to favorites</span>
        </button>
      </div>
    </section>
  </article>
</template>

<script>

export default {
  props: ['repo'],
  methods: {
    isRepoInFavorites(id) {
      return this.$store.state.favRepos.find(repo => repo.id === id)
    },
    handler(id) {
      if (this.$store.state.favRepos.find(repo => repo.id === id)) {
        this.$store.commit('removeRepo', id)
      } else {
        const repo = this.$store.state.repos.find(item => item.id === id)
        this.$store.commit('addToFav', repo)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.repository-info {
  background-color: #d8cbec;
  border-radius: 4px;
  font-weight: 700;

  .header {
    padding: 10px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    h2 {
      color: blue;
      font-size: 1.2rem;
    }
  }

  .main-info {
    padding: 30px 10px;

    .photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    a {
      color: blue;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      i {
        font-size: 2rem;
        padding-left: 10px;
        vertical-align: middle;
        color: #333;
      }
    }

    .descr {
      font-size: 0.9rem;
      margin-top: 15px;
    }

    .add-btn {
      margin-top: 20px;

      button {
        background-color: blue;
        letter-spacing: 1px;
        font-weight: 700;
        font-size: 1rem;
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 2px rgba(0, 0, 0, 0.2);
        transition: box-shadow .3s ease;
        color: #fff;

        &:hover {
          opacity: 0.7;
          box-shadow: none;
        }
      }
    }
  }
}
</style>