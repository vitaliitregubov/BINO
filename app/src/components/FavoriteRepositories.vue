<template>
  <div class="favorite-repos flex evenly wrap ">
    <RepositoryCardInfo v-for="repo in $store.state.favRepos" :key="repo.id" :repo="repo" />
  </div>
</template>

<script>
import RepositoryCardInfo from './RepositoryCardInfo'

export default {
  components: {
    RepositoryCardInfo
  }
}
</script>

<style lang="scss" scoped>
.favorite-repos {
  overflow-y: scroll;
  height: calc(100vh - 60px);

  .repository-info {
    width: 400px;
    height: 340px;
    margin: 10px;
  }
}
</style>