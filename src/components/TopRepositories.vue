<template>
<div class="wrapper">
  <section class="section repo-search">
    <label>
      <i class="fas fa-search"></i>
      <input
        @input="throttleMethod" v-model.trim="inputValue"
        type="text" class="search-bar" placeholder="Search repos"
      />
    </label>
  
  <div class="table">
    <table class="repo-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Repo</th>
          <th>Stars</th>
          <th>Fav</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(repo, i) in $store.state.repos" :key="i"
          @click="showRepoInfo(repo.id)"
          :class="{ 'focused' : isRepoFocused(repo.id) }"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ repo.full_name }}</td>
          <td class="stars">{{ repo.stargazers_count }}</td>
          <td :class="[ { 'fav-repo' : isRepoAdded(repo.id) }, 'favorite']">
            <i class="fas fa-star"></i>
          </td>
        </tr>

        <tr v-observe-visibility="loadMore" :style="{ visibility: 'hidden'}">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h2 v-if="error" class="error-msg">API calls limit exceeded!</h2>
  </div>
  </section>

  <section class="section repo-detailed-info">
    <RepositoryCardInfo v-if="$store.state.chosenRepo" :repo="$store.state.chosenRepo" />
  </section>
</div>
</template>

<script>
import RepositoryCardInfo from './RepositoryCardInfo'
import { throttle } from 'lodash'

export default {
  components: {
    RepositoryCardInfo,
  },
  data() {
    return {
      BASE_URL: 'https://api.github.com/search/repositories?',
      inputValue: 'vue',
      page: 1,
      error: false
    }
  },
  created() {
    try {
      this.$store.dispatch('loadRepos', `${this.BASE_URL}q=${this.inputValue}&per_page=10&page=${this.page}`)
    } catch (error) {
        console.log(error)
        this.error = true
        return
    }
  },
  methods: {
    loadMore(isVisible) {
      if (!isVisible || !this.$store.state.repos.length) return

      this.page += 1;

      try {
        this.$store.dispatch('loadMore', `${this.BASE_URL}q=${this.inputValue}&per_page=10&page=${this.page}`)
      } catch (error) {
          console.log(error)
          this.error = true
          return
      }
    },
    throttleMethod: throttle(function(){
      try {
        const req = this.inputValue || 'stars:>1000'
        this.$store.dispatch('loadRepos', `${this.BASE_URL}q=${req}&per_page=10&page=${this.page}`)
        console.log(req)
      } catch (error) {
          console.log(error)
          this.error = true
          return
      }
    }, 1000),
    showRepoInfo(id) {
      this.$store.commit('showRepoInfo', id)
    },
    isRepoAdded(id) {
      return this.$store.state.favRepos.find(item => item.id === id)
    },
    isRepoFocused(id) {
      if (!this.$store.state.chosenRepo) return
      return this.$store.state.chosenRepo.id === id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/helpers';

.wrapper {
    display: flex;
}

.section {
  width: 50%;

  label {
    position: relative;

    i {
      position: absolute;
      right: 15px;
      top: 10%;
      font-size: 1.2rem;
      color: rgba(0, 0, 0, 0.3);
    }

    .search-bar {
      display: inline-block;
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      padding: 15px 40px 15px 10px;
      transition: box-shadow .3s ease;

      &:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    }
  }

  .table {
    position: relative;
    margin-top: 15px;
    overflow-y: scroll;
    max-height: 400px;
  }

  .error-msg {
    color: #d20962;
    font-size: 2rem;
  }

  .repo-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);

    tr {
      background-color: #d8cbec;
      border: 1px solid rgba(0, 0, 0, 0.2);

      td {
        padding: 12px 10px;

        &.stars {
          text-align: center;
        }

        &.favorite {
          text-align: center;
       
          &.fav-repo i {
            color: $color-active;
          }
        }

        &:first-of-type {
          text-align: right;
        }
      }

      th {
        padding: 16px 0;
      }
    }

    thead {
      tr {
        background-color: #b09cd3;
        padding: 20px 30px;  
      }
    }

    tbody {
      tr {
        cursor: pointer;

        &.focused {
          background-color: #3294bb;
          background-color: #8e43e7;
          color: $color-active;
        }
      }
    }
  }

  &.repo-detailed-info {
    padding-left: 20px;
    
  }

}
</style>