import linkisRequest from '@/services/requests';


export function listFileTrees(path: string) {
  return linkisRequest.get({
    url: '/filesystem/getDirFileTrees',
    params: {
      path: path
    }
  })
}
