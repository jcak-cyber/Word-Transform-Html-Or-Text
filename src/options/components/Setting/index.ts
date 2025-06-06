export const tempKey = {
  default: "0",
  HTMLContent: "1",
  VUEContent: "2",
  Custom: "3",
};

const htmlTemp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>html模板</title>
</head>
<body>
    {{ template }}
</body>
</html>
`;

const vueTemp = `<template>
    // vue模板
    <div class="content">
    {{ template }}
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>
`;

const tempMaps = {
  [tempKey.default]: "{{ template }}",
  [tempKey.HTMLContent]: htmlTemp,
  [tempKey.VUEContent]: vueTemp,
  [tempKey.Custom]: "",
};

export default tempMaps;
