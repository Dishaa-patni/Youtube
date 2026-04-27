
// this is a  higher-order function that wraps async route handlers so we don’t have to write try/catch everywhere
const asynchandler = (requestHandler) => {
return (req , res , next ) => {
Promise.resolve(requestHandler(req , res , next)).catch((err)=> next(err))
}
}

export {asynchandler}