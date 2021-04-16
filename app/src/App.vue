<template>
<div>
  <header class="page-header flex between center">
    <h1 class="logo">GitHub client</h1>
    <nav>
      <ul class="menu-tabs flex">
        <li
          @click="tabActive = 'TopRepositories'"
          :class="{ 'tab-active': tabActive === 'TopRepositories' }"
        >Top repo</li>

        <li
          @click="tabActive = 'FavoriteRepositories'"
          :class="[{ 'tab-active': tabActive === 'FavoriteRepositories' }, 'favorite-repo']"
        >
          <span v-if="$store.state.favRepos.length">
            {{ $store.state.favRepos.length }}
          </span>
          Favorite repo
        </li>
      </ul>
    </nav>
  </header>

  <main class="page-main">
    <keep-alive>
      <component :is="tabActive"></component>
    </keep-alive>
  </main>
</div>
</template>

<script>
import TopRepositories from '@/components/TopRepositories'
import FavoriteRepositories from '@/components/FavoriteRepositories'

export default {
  name: 'App',
  components: {
    TopRepositories,
    FavoriteRepositories
  },
  data() {
    return {
      tabActive: 'TopRepositories',
    }
  }
}
</script>

<style lang="scss">
@import './scss/helpers';

.page-header {
  padding: 5px 15px;
  background-color: $color-accent;
  font-size: 1.4rem;
  color: #fff;

  .logo {
    font-size: 1.4rem;
    font-weight: 400;
    text-transform: capitalize;
  }

  .menu-tabs {
    user-select: none;

    li {
      padding: 10px;
      border: 2px solid #000;
      cursor: pointer;

      &.favorite-repo {
        position: relative;
        
        span {
          position: absolute;
          top: 2px;
          right: 2px;
          display: inline-block;
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
          line-height: 1.2rem;
          color: #333;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 700;
          background-color: $color-active;
        }
      }

      &.tab-active {
        border: none;
        color: $color-active;
        background-color: $color-background-primary;
      }
    }
  }

}

.page-main {
  padding: 10px 15px;
}
</style>
