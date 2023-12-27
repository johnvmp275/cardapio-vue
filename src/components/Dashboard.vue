<script setup></script>

<template>
  <div id="tabela-pedido">
    <div>
      <div class="tabela-topo">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pedido:</div>
        <div>Acompanhamento:</div>
        <div>Complementos:</div>
        <div>Observação:</div>
        <div>Status:</div>
      </div>
    </div>
    <div id="tabela-rows">
      <div class="tabela-row">
        <div class="id-pedido">2</div>
        <div>Joao</div>
        <div>teste</div>
        <div>teste</div>
        <div>
          <ul>
            <li>teste</li>
            <li>teste</li>
          </ul>
        </div>
        <div>teste</div>
        <div>
          <select name="status" id="status">
            <option value="">Selecione</option>
            <option value="">Selecione</option>
            <option value="">Selecione</option>
          </select>
          <button class="delete-btn">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
#tabela-pedido {
  width: 100%;
  max-width: 1330px;
  margin: 0 auto;
}

.tabela-topo,
#tabela-rows,
.tabela-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tabela-topo {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #1f1d2b;
}

.tabela-topo div,
.tabela-row div {
  width: 100%;
  min-width: 5%;
  max-width: 16.16%;
  overflow: hidden;
}

.tabela-row {
  width: 100%;
  padding: 12px;
  border-bottom: 3px solid #1f1d2b;
}

.tabela-topo .order-id,
.tabela-row .id-pedido {
  max-width: 3%;
  min-width: 3%;
}
</style>
