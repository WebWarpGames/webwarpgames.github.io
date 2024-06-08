import pygame
import sys

# Initialisieren von Pygame
pygame.init()

# Vollbildmodus aktivieren
screen = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)
width, height = screen.get_size()

# Farben definieren
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Spielgeschwindigkeit
clock = pygame.time.Clock()
ball_speed = [5, 5]
paddle_speed = 10

# Ball initialisieren
ball = pygame.Rect(width//2 - 15, height//2 - 15, 30, 30)

# Schläger initialisieren
paddle1 = pygame.Rect(50, height//2 - 60, 20, 120)
paddle2 = pygame.Rect(width - 70, height//2 - 60, 20, 120)

def draw_objects():
    screen.fill(BLACK)
    pygame.draw.rect(screen, WHITE, paddle1)
    pygame.draw.rect(screen, WHITE, paddle2)
    pygame.draw.ellipse(screen, WHITE, ball)
    pygame.draw.aaline(screen, WHITE, (width // 2, 0), (width // 2, height))

def move_ball():
    global ball_speed

    ball.x += ball_speed[0]
    ball.y += ball_speed[1]

    if ball.top <= 0 or ball.bottom >= height:
        ball_speed[1] = -ball_speed[1]

    if ball.left <= 0 or ball.right >= width:
        ball_speed[0] = -ball_speed[0]

    if ball.colliderect(paddle1) or ball.colliderect(paddle2):
        ball_speed[0] = -ball_speed[0]

def move_paddles():
    keys = pygame.key.get_pressed()

    if keys[pygame.K_w] and paddle1.top > 0:
        paddle1.y -= paddle_speed
    if keys[pygame.K_s] and paddle1.bottom < height:
        paddle1.y += paddle_speed
    if keys[pygame.K_UP] and paddle2.top > 0:
        paddle2.y -= paddle_speed
    if keys[pygame.K_DOWN] and paddle2.bottom < height:
        paddle2.y += paddle_speed

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                pygame.quit()
                sys.exit()

    move_ball()
    move_paddles()
    draw_objects()

    pygame.display.flip()
    clock.tick(60)
