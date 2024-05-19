import { call, fork, put, take } from 'redux-saga/effects'
import { IResponse } from '~/models/response'
import { TokenAuthPayload, TokenResponse } from '~/models/token'
import authService from '~/services/auth.service'
import tokenService from '~/services/token.service'
import { authActions } from './auth.slice'
import { PayloadAction } from '@reduxjs/toolkit'

function* handleSignIn(tokenPayload: TokenAuthPayload) {
  const resp: IResponse<TokenResponse> = yield call(authService.signIn, tokenPayload)
  if (resp.status === 200) {
    tokenService.signIn(resp.data!.accessToken, resp.data!.refreshToken)
  }
}

function* handleSignOut() {}

function* watchAuthFlow() {
  while (true) {
    let isLogin = false
    const acccessToken: string | null = yield call(tokenService.getAccessToken)
    const refreshToken: string | null = yield call(tokenService.getRefreshToken)

    if (acccessToken) {
      isLogin = true
      yield put(authActions.signIn())
    } else if (refreshToken) {
      const resp: IResponse<TokenResponse> = yield call(tokenService.generateToken, refreshToken)
      if (resp.status === 200) {
        tokenService.signIn(resp.data!.accessToken, resp.data!.refreshToken)
        isLogin = true
        yield put(authActions.signIn())
      } else {
        yield put(handleSignOut)
      }
    }

    if (isLogin) {
      yield take(authActions.signOut)
      yield call(handleSignOut)
    } else {
      const actions: PayloadAction<TokenAuthPayload> = yield take(authActions.signIn)
      yield call(handleSignIn, actions.payload)
    }
  }
}

export default function* authSaga() {
  yield fork(watchAuthFlow)
}
