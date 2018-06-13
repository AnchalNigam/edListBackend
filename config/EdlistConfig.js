let EdListConfig={};
EdListConfig.port=3004;
EdListConfig.allowedCorsOrigin="*";
EdListConfig.env="dev";
EdListConfig.db={
    uri:"mongodb://127.0.0.1:27017/EdListDb"
}
EdListConfig.apiVersion = '/api/v1';

module.exports = {
    port: EdListConfig.port,
    allowedCorsOrigin: EdListConfig.allowedCorsOrigin,
    environment: EdListConfig.env,
    db :EdListConfig.db,
    apiVersion : EdListConfig.apiVersion
};