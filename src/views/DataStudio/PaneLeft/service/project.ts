import hyRequest from '@/services/requests';


export function listFileTrees(path: string) {
  return hyRequest.get({
    url: '/filesystem/getDirFileTrees',
    params: {
      path: path
    }
  })
}
